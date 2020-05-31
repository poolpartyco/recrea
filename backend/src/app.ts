import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {config} from './config';
import ProductServices from './services/ProductServices'

class App {
    public app: express.Application;
    public mongoUrl: string = String(config.dataBase.URL)

    constructor() {
        this.app = express();
        this.config();
        this.addServices();
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, config.dataBase.options);
    }

    private addServices(): void {
        ProductServices.routes(this.app);
    }
}

export default new App().app;