
import {Express, Request, Response} from 'express';
import ResponseOperation from '../helpers/ResponseOperation';
import { IUser, IUserController, IUserPrototype } from '../interfaces/UserInterfaces';
import UserControllerMongo from '../controllers/UserControllerMongo';
import { HttpCode } from '../helpers/HttpCodes';

export default class UserServices {

    public static routes(app: any){
        app.post('/api/user/signup', (req: Request, res: Response) => {
            try {
                this.create(req, res);
            } catch (e){
                return this.respond(res, new ResponseOperation<IUser>(false, HttpCode.BAD_REQUEST, null, {msf: 'Incorrect params'}));
            }
        });

        app.get('/api/user/getById/:ID', (req: Request, res: Response) => {
            try {
                this.getById(req, res);
            } catch (e){
                return this.respond(res, new ResponseOperation<IUser>(false, HttpCode.BAD_REQUEST, null, {msf: 'Incorrect params'}));
            }
        });
    }

    private static create(req: Request, res: Response){
        const controller: IUserController = new UserControllerMongo();

        const userData: IUserPrototype = {
            nickname: req.body.nickname,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            company: req.body.company,
        }
        controller.createUser(userData)
        .then((result) => this.respond(res, result))
        .catch((result) => this.respond(res, result));
    }

    private static getById(req: Request, res: Response){
        const controller: IUserController = new UserControllerMongo();
        controller.getUserById(req.params.ID)
        .then((result) => this.respond(res, result))
        .catch((result) => this.respond(res, result));
    }


    private static respond(res: Response, result: ResponseOperation<any>){
        res.status(result.statusCode).json(result);
    }


}