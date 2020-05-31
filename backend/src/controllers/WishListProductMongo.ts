import UserModelMongo from '../models/UserModelMongo';
import {IUser, IWishListProductController, IWishProduct} from '../interfaces/UserInterfaces';
import { HttpCode } from '../helpers/HttpCodes';
import ResponseOperation from '../helpers/ResponseOperation';

export default class IWishListProductControllerMongo implements IWishListProductController {
    public async createWishProduct(userId: string, wishProduct: IWishProduct): Promise<ResponseOperation<IWishProduct>>{
        return UserModelMongo.findById({ _id: userId }).exec()
            .then((user: IUser) =>{
                user.wishList.push(wishProduct)
                return user.save()
                    .then((newUser: IUser) =>{
                        return Promise.resolve(
                            new ResponseOperation<IWishProduct>(true, HttpCode.OK, wishProduct)
                        );
                    })
            }).catch(err => {
                return Promise.reject(
                    new ResponseOperation<IUser>(false, HttpCode.INTERNAL_ERROR, null, err)
                );
            })
    }

    public async getWishList(): Promise<ResponseOperation<any[]>>{
        return UserModelMongo.find().exec()
            .then((users: IUser[]) => {
                const wishListProducts = users.map((user: IUser) =>{
                    const { _id, company, wishList } = user;
                    return wishList.map(({ productName, desiredPrice, quantity, metric, description }: IWishProduct) => {
                        return { productName, desiredPrice, quantity, metric, description, company, userId: _id }
                    })
                });
                const wishListProduct = wishListProducts.reduce((accumulator, value) => accumulator.concat(value), []);
                return Promise.resolve(
                    new ResponseOperation<any[]>(true, HttpCode.OK, wishListProduct)
                );
            }).catch(err => {
                return Promise.reject(
                    new ResponseOperation<any[]>(false, HttpCode.INTERNAL_ERROR, null, err)
                );
            })
    }

    public async getMyWishList(userId: string): Promise<ResponseOperation<IWishProduct[]>>{
        return UserModelMongo.findById({ _id: userId }).exec()
            .then((user: IUser) =>{
                const wishList = user.wishList || [];
                return Promise.resolve(
                    new ResponseOperation<IWishProduct[]>(true, HttpCode.OK, wishList)
                );
            }).catch(err =>{
                return Promise.reject(
                    new ResponseOperation<IWishProduct[]>(false, HttpCode.INTERNAL_ERROR, null, err)
                );
            })
    }
}