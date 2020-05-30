export const config = {
    server: {
        port: process.env.PORT,
        host: process.env.HOST,
        protocol: 'http'
    },
    dataBase:{
        URL: process.env.MONGO_URL,
        options:{
            pool: {
                max : 5,
                min : 0,
                idle: 10000
            },
            useUnifiedTopology  : true,
            connectTimeoutMS    : 10000,
            socketTimeoutMS     : 45000,
            useNewUrlParser     : true,
            useFindAndModify    : false,
            useCreateIndex      : true,
        }
    },
}