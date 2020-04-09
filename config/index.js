module.exports = {
    port: '3001',
    mongooseUrl: 'mongodb+srv://artmrsvch:123Mama@cluster0-nuch7.azure.mongodb.net/app?retryWrites=true&w=majority',
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