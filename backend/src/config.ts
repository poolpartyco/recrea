import dotenv from 'dotenv';
dotenv.config();
export const config = {
    server: {
        port: process.env.PORT,
        host: process.env.HOST,
        protocol: 'http'
    },
    dataBase:{
        URL: process.env.MONGO_URL,
        options:{
            poolSize: 5,
            useUnifiedTopology  : true,
            connectTimeoutMS    : 10000,
            socketTimeoutMS     : 45000,
            useNewUrlParser     : true,
            useFindAndModify    : false,
            useCreateIndex      : true,
        }
    },
}