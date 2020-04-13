const { tokens, secret } = require('../config/index').jwt
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = mongoose.model('User');

function generateAccessToken(userId) {
    const payload = {
        userId,
        type: tokens.access.type
    }
    const options = { expiresIn: tokens.access.expiresIn }
    const token = { accessToken: jwt.sign(payload, secret, options) }

    return { ...token, accessTokenExpiredAt: jwt.verify(token.accessToken, secret).exp * 1000 }
}

function generateRefreshToken(userId) {
    const payload = {
        userId,
        type: tokens.refresh.type
    }
    const options = { expiresIn: tokens.refresh.expiresIn }
    const token = { refreshToken: jwt.sign(payload, secret, options) }

    return { ...token, refreshTokenExpiredAt: jwt.verify(token.refreshToken, secret).exp * 1000 }
}

const replaceDbRefreshToken = (refreshToken, userId) => {
    return User.findOneAndUpdate({ _id: userId }, { refreshToken })
}
const generateTokens = (userId) => {
    const tokenObj = {
        ...generateAccessToken(userId),
        ...generateRefreshToken(userId)
    }
    return tokenObj
}
module.exports = {
    generateAccessToken,
    generateRefreshToken,
    replaceDbRefreshToken,
    generateTokens
}