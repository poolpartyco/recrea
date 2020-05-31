import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import {config} from './config';
import authentication from './helpers/AuthenticationFunction';
import ProductServices from './services/ProductServices';
import UserServices from './services/UserServices';
import AuthenticationServices from './services/AuthenticationServices';

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
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.all('/apisec/*', authentication);
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, config.dataBase.options);
    }

    private addServices(): void {
        ProductServices.routes(this.app);
        UserServices.routes(this.app);
        AuthenticationServices.routes(this.app);
    }
}

export default new App().app;