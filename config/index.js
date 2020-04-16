module.exports = {
    port: '3000',
    jwt: {
        secret: 'pizdecNaxoiBlyat',
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