import UserModelMongo from '../models/UserModelMongo';
import {IUser, IWishListProductController, IWishProduct} from '../interfaces/UserInterfaces';
import { HttpCode } from '../helpers/HttpCodes';
import ResponseOperation from '../helpers/ResponseOperation';

export default class IWishListProductControllerMongo implements IWishListProductController {
    public async createWishProduct(userId: string, wishProduct: IWishProduct): Promise<ResponseOperation<IUser>>{
        return UserModelMongo.findById({ _id: userId }).exec()
            .then((user: IUser) =>{
                user.wishList.push(wishProduct)
                return user.save()
                    .then((newUser: IUser) =>{
                        return Promise.resolve(
                            new ResponseOperation<IUser>(true, HttpCode.OK, newUser)
                        );
                    })
            }).catch((err)=>{
                return Promise.reject(
                    new ResponseOperation<IUser>(false, HttpCode.INTERNAL_ERROR, null, err)
                );
            })
    }
}