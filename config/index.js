module.exports = {
    port: '8080',
    jwt: {
        secret: process.env.SECRET || 'testSecretKey',
        tokens: {
            access: {
                type: 'access',
                expiresIn: '30m',
            },
            refresh: {
                type: 'refresh',
                expiresIn: '1h',
            }
        }
    }
}