import {Document} from 'mongoose';
import ResponseOperation from '../helpers/ResponseOperation';

export interface IUser extends Document {
    nickname: string,
    firstName: string,
    lastName: string,
    phone?: string,
    email: string,
    password: string,
    company?: string,
    status: boolean,
    wishList: IWishProduct[];
}

export interface IUserPrototype {
    _id?: IUser['_id']
    nickname?: string,
    firstName?: string,
    lastName?: string,
    phone?: string,
    email?: string,
    password?: string,
    company?: string,
    wishList?: IWishProduct[];
}


export interface IAuthenticationController{
    signIn(user: IUserPrototype): ResponseOperation<IUser>;
}

export interface IUserControllers {
    createUser(user: IUserPrototype): ResponseOperation<IUser>;
    getUserById(id: IUser['_id']): ResponseOperation<IUser>;
    updateUser(user: IUserPrototype): ResponseOperation<IUser>;
    deleteUserById(id: IUser['_id']): ResponseOperation<IUser>;
    activateById(id: IUser['_id']): ResponseOperation<IUser>;
    inactivateById(id: IUser['_id']): ResponseOperation<IUser>;
}

// TODO Complete
export interface IWishListProductController{
    addProduct(product: IWishProduct): ResponseOperation<IUser>;
}

export interface IWishProduct {
    productName: string, 
    desiredPrice: number,
    quantity: number,
    description: string,
}