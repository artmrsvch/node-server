const { tokens, secret } = require('../config/index').jwt
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = mongoose.model('User');

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

const generateRefreshToken = (userId) => {
    const payload = {
        userId,
        type: tokens.refresh.type
    }
    const options = { expiresIn: tokens.refresh.expiresIn }

    return {
        refreshToken: jwt.sign(payload, secret, options),
        refreshTokenExpiredAt: tokens.refresh.expiresIn
    }
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