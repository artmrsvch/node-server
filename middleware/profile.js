const fs = require('fs')
const path = require('path')

const formidable = require("formidable");
const bcrypt = require('bcryptjs')

const User = require('../models/User')

const parseFormData = reqeust => {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        const upload = path.join("assets", "users");

        form.uploadDir = path.join(process.cwd(), upload);

        form.parse(reqeust, (err, fields, files) => {
            err && reject(err);
            if ("avatar" in fields) {
                resolve({ ...fields, avatar: null });
            } else {
                const fileName = path.join(upload, files.avatar.name);

                fs.rename(files.avatar.path, fileName, err => {
                    err && reject(err);

                    reqeust.imageType = files.avatar.type
                    resolve({
                        image: path.join(upload, files.avatar.name),
                        ...fields
                    });
                });
            }
        });
    });
}
const fieldsToRewritten = async (fields, user, res) => {
    let temp = {}

    for (const field in fields) {
        if (fields[field] && field !== '') {
            if (field === 'oldPassword') {
                const isMatch = await bcrypt.compare(fields[field], user.password)
                if (!isMatch) res.status(400).json({ message: 'Не верный пароль!' })
            } else if (field === 'newPassword') {
                (fields[field].length < 6)
                    ? res.status(400).json({ message: 'Минимальная длина пароля 6 символов' })
                    : temp.password = await bcrypt.hash(fields[field], 12)
            }
            else {
                temp[field] = fields[field]
            }
        }
    }

    return temp
}
module.exports = {
    filterFields: async (req, res, next) => {
        try {
            const data = await parseFormData(req)
            const user = await User.findOne({ _id: req.userId })
            const rest = await fieldsToRewritten(data, user, res)

            req.payload = rest

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
        next()
    }
}

