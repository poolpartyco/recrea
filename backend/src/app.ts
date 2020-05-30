import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {config} from './config';

class App {
    public app: express.Application;
    public mongoUrl: string = config.dataBase.URL

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        dotenv.config();
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, config.dataBase.options);
    }
}

export default new App().app;