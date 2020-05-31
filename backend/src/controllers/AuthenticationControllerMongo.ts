import { IAuthenticationController, IUserPrototype, IUser } from "../interfaces/UserInterfaces";
import UserModel from '../models/UserModelMongo';

import ResponseOperation from "../helpers/ResponseOperation";
import { HttpCode } from "../helpers/HttpCodes";

export default class AuthenticationControllerMongo implements IAuthenticationController{
    public async signIn(user: IUserPrototype): Promise<ResponseOperation<[IUser, string]>> {
        
        return UserModel.find({email: user.email}).exec()
        .then( async (oldUsers: IUser[]) => {
            if(oldUsers.length === 0){
                return Promise.reject( new ResponseOperation<[IUser, string]>(false, HttpCode.BAD_REQUEST, null, { msg: 'The email is not registered.'}) );
            }
            const oldUser: IUser = oldUsers[0];

            return oldUser.validatePassword(user.password)
            .then( async (valid: boolean) => {
                if (valid){
                    return Promise.resolve(new ResponseOperation<[IUser, string]>(true, HttpCode.OK, [oldUser, await oldUser.generateAuthToken()]))
                } else {
                    return Promise.reject(new ResponseOperation<[IUser, string]>(false, HttpCode.BAD_REQUEST, null, { msg: 'Incorrect Password'}))
                }
            })
        })
    }


    public async signOut(user: IUserPrototype, token: string): Promise<ResponseOperation<IUser>> {
        return UserModel.find({email: user.email}).exec()
        .then( async (oldUsers: IUser[]) => {
            if(oldUsers.length === 0){
                return Promise.reject( new ResponseOperation<[IUser, string]>(false, HttpCode.BAD_REQUEST, null, { msg: 'The email is not registered.'}) );
            }
            const oldUser: IUser = oldUsers[0];

            return oldUser.removeAuthToken(token)
            .then(() => {
                return Promise.resolve( new ResponseOperation<IUser>(true, HttpCode.OK, oldUser));
            })
        }).catch((error: any) => {
            return Promise.reject( new ResponseOperation<IUser>(false, HttpCode.INTERNAL_ERROR, null, error))
        })
    }
}