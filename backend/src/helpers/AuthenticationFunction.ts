import  Jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import  UserModel from '../models/UserModelMongo';
import { HttpCode } from './HttpCodes';

const AuthenticationFunction = async(req: any, res: Response, next: NextFunction) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data: any = Jwt.verify(token, process.env.JWT_KEY)
    try {
        const user = await UserModel.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        
        req.user = user
        req.token = token
        next()

    } catch (error) {
        res.status(HttpCode.UNAUTHORIZED).send({ error: 'Not authorized to access this resource' })
    }

}

export default AuthenticationFunction;