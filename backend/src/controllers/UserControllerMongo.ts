import UserMongo from '../models/UserModelMongo';
import { IUserPrototype, IUserController, IUser } from "../interfaces/UserInterfaces";
import ResponseOperation from "../helpers/ResponseOperation";
import { HttpCode } from '../helpers/HttpCodes';

export default class UserController implements IUserController {
    public async createUser(user: IUserPrototype): Promise<ResponseOperation<[IUser, string]>> {
        const dataUser = {
            nickname:   user.nickname,
            firstName:  user.firstName,
            lastName:   user.lastName,
            phone:      user.phone,
            email:      user.email,
            password:   user.password,
            company:    user.company,
            status:     true
        }
        const recordedUser: IUser = new UserMongo(dataUser);
        return recordedUser.save()
        .then( async (newUser: IUser) => {
            const token = await recordedUser.generateAuthToken();
            return Promise.resolve(new ResponseOperation<[IUser, string]>(true, HttpCode.CREATED, [newUser, token]));
        })
        .catch( (error: any) => {
            return Promise.reject(new ResponseOperation<[IUser, string]>(false, HttpCode.INTERNAL_ERROR, null, error));
        })
    }
    
    public async getUserById(id: IUser['_id']): Promise<ResponseOperation<IUser>>  {
        return UserMongo.findById(id)
        .then( (newUser: IUser) => {
            return Promise.resolve(new ResponseOperation(true, HttpCode.OK, newUser));
        })
        .catch( (error: any) => {
            return Promise.reject(new ResponseOperation(false, HttpCode.INTERNAL_ERROR, null, error));
        })
    }

    public async updateUser(user: IUserPrototype): Promise<ResponseOperation<IUser>>  {
        return null;
    }

    public async deleteUserById(id: IUser['_id']): Promise<ResponseOperation<IUser>>  {
        return null;
    }

    public async activateById(id: IUser['_id']): Promise<ResponseOperation<IUser>>  {
        return null;
    }

    public async inactivateById(id: IUser['_id']): Promise<ResponseOperation<IUser>> {
        return null;
    }
}