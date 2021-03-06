const fs = require('fs')
const path = require('path')

const formidable = require("formidable");
const sharp = require('sharp')
const bcrypt = require('bcryptjs')

const User = require('../models/User')

const parseFormData = (reqeust, res) => {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        const upload = path.join("assets", "users");

        form.uploadDir = path.join(process.cwd(), upload);

        form.parse(reqeust, (err, fields, files) => {
            err && reject(err);
            if (files.avatar.size > 2000000) res.status(401).json({ message: 'Размер файла не должен превышать 2MB' })
            if (files.avatar.type === 'image/jpeg' || files.avatar.type === 'image/jpg' || files.avatar.type === 'image/png') {
                if (files.avatar.size > 200000) {
                    try {
                        sharp(files.avatar.path)
                            .resize(200, 200)
                            .toFile(files.avatar.path, (err, info) => {
                                if (err) {
                                    console.log(err)
                                    return;
                                }
                                console.log(info);
                            })
                    } catch (e) {
                        res.status(500).json({ message: 'Что-то пошло не так при сжатии файла' })
                    }
                }
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
            } else {
                fs.unlink(files.avatar.path, err => {
                    res.status(401).json({ message: 'Файл должен быть формата JPEG/PNG/JPG' })
                })
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
            const data = await parseFormData(req, res)
            const user = await User.findOne({ _id: req.userId })
            const rest = await fieldsToRewritten(data, user, res)

            req.payload = rest

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
        next()
    }
}

