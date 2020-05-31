import { Request, Response } from 'express';
import ResponseOperation from '../helpers/ResponseOperation';
import { IUser, IWishListProductController, IWishProduct } from '../interfaces/UserInterfaces';
import WishListProductMongo from '../controllers/WishListProductMongo';
import { HttpCode } from '../helpers/HttpCodes';

export default class WishListProductServices {

    public static routes(app: any){
        app.post('/apisec/wishlist/create', (req: Request, res: Response) => {
            try {
                this.create(req, res);
            } catch (e){
                return this.respond(res, new ResponseOperation<IUser>(false, HttpCode.BAD_REQUEST, null, {msf: 'Incorrect params'}));
            }
        });

        app.get('/api/wishlist', (req: Request, res: Response) => {
            try {
                this.getList(req, res);
            } catch (e){
                return this.respond(res, new ResponseOperation<IUser>(false, HttpCode.BAD_REQUEST, null, {msf: 'Incorrect params'}));
            }
        })

        app.get('/apisec/wishlist/myList', (req: Request, res: Response) => {
            try {
                this.getMyList(req, res);
            } catch (e){
                return this.respond(res, new ResponseOperation<IUser>(false, HttpCode.BAD_REQUEST, null, {msf: 'Incorrect params'}));
            }
        })

        app.get('/api/wishlist/byUserId/:userId', (req: Request, res: Response) => {
            try {
                this.getListByUserId(req, res);
            } catch (e){
                return this.respond(res, new ResponseOperation<IUser>(false, HttpCode.BAD_REQUEST, null, {msf: 'Incorrect params'}));
            }
        })
    }

    private static create(req: any, res: Response){
        const controller: IWishListProductController = new WishListProductMongo();
        const userId:string = String(req.user._id);
        const userData: IWishProduct = {
            productName: req.body.productName,
            desiredPrice: req.body.desiredPrice,
            quantity: req.body.quantity,
            description: req.body.description,
        }
        controller.createWishProduct(userId, userData)
            .then((result) => this.respond(res, result))
            .catch((result) => this.respond(res, result));
    }

    public static getList(req: Request, res: Response){
        const controller: IWishListProductController = new WishListProductMongo();
        controller.getWishList()
            .then((result) => this.respond(res, result))
            .catch((result) => this.respond(res, result));
    }

    public static getMyList(req: any, res: Response){
        const controller: IWishListProductController = new WishListProductMongo();
        const userId:string = String(req.user.id);
        controller.getMyWishList(userId)
            .then((result) => this.respond(res, result))
            .catch((result) => this.respond(res, result));
    }

    public static getListByUserId(req: Request, res: Response){
        const controller: IWishListProductController = new WishListProductMongo();
        const userId:string = String(req.params.userId);
        controller.getMyWishList(userId)
            .then((result) => this.respond(res, result))
            .catch((result) => this.respond(res, result));
    }

    private static respond(res: Response, result: ResponseOperation<any>){
        res.status(result.statusCode).json(result);
    }
}