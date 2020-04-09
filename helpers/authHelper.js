const uuid = require('uuid')
const { tokens, secret } = require('../config/index').jwt
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const Token = mongoose.model('Token');

const generateAccessToken = (userId) => {
    const payload = {
        userId,
        type: tokens.access.type
    }
    const options = { expiresIn: tokens.access.expiresIn }
    return {
        accessToken: jwt.sign(payload, secret, options),
        accessTokenExpiredAt: tokens.access.expiresIn,
    }
}

const generateRefreshToken = () => {
    const payload = {
        id: uuid.v4(),
        type: tokens.refresh.type
    }
    const options = { expiresIn: tokens.refresh.expiresIn }

    return {
        id: payload.id,
        refreshToken: jwt.sign(payload, secret, options),
        refreshTokenExpiredAt: tokens.refresh.expiresIn
    }
}

const replaceDbRefreshToken = (tokenId, userId) => {
    Token.findOneAndRemove({ userId })
        .exec()
        .then(() => Token.create({ tokenId, userId }))
}
const generateTokens = (userId) => {
    return {
        ...generateAccessToken(userId),
        ...generateRefreshToken()
    }
}
module.exports = {
    generateAccessToken,
    generateRefreshToken,
    replaceDbRefreshToken,
    generateTokens
}