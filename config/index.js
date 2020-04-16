module.exports = {
    port: '8080',
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