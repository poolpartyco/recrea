import {Document} from 'mongoose';
import ResponseOperation from '../helpers/ResponseOperation';

export interface IUser extends Document {
    nickname: string,
    firstName: string,
    lastName: string,
    phone?: string,
    email: string,
    tokens: string[],
    password: string,
    company?: string,
    status: boolean,
    wishList: IWishProduct[];

    generateAuthToken(): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
    removeAuthToken(token: string): Promise<IUser>;
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

export interface IWishProduct {
    productName: string,
    desiredPrice: number,
    quantity: number,
    description: string,
}


export interface IAuthenticationController{
    signIn(user: IUserPrototype): Promise<ResponseOperation<[IUser, string]>>;
    signOut(user: IUserPrototype, token: string): Promise<ResponseOperation<IUser>>;
}

export interface IUserController {
    createUser(user: IUserPrototype): Promise<ResponseOperation<[IUser, string]>>;
    getUserById(id: IUser['_id']): Promise<ResponseOperation<IUser>>;
    updateUser(user: IUserPrototype): Promise<ResponseOperation<IUser>>;
    deleteUserById(id: IUser['_id']): Promise<ResponseOperation<IUser>>;
    activateById(id: IUser['_id']): Promise<ResponseOperation<IUser>>;
    inactivateById(id: IUser['_id']): Promise<ResponseOperation<IUser>>;
}

// TODO Complete
export interface IWishListProductController{
    createWishProduct(userId: string, wishProduct: IWishProduct): Promise<ResponseOperation<IWishProduct>>;
    getWishList(): Promise<ResponseOperation<IWishProduct[]>>;
    getMyWishList(userId: string): Promise<ResponseOperation<IWishProduct[]>>;
}
