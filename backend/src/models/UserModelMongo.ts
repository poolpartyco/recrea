/**
 * Importing required interfaces
 */
import { IUser } from '../interfaces/UserInterfaces';
/**
 * Importing Libreries
 */
import { Schema, model } from 'mongoose';
import Validator from 'validator';
import Bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { config } from '../config';
import {metrics} from '../rules/MetricList';

const userSchema = new Schema({
    nickname:   { type: String, required: "The nickname is required", unique: "The nickname must be unique" },
    firstName:  { type: String, required: "The first Name is required" },
    lastName:   { type: String },
    phone:      { type: String  },
    email:      { type: String, required: "The email is required", unique: true, lowercase: true },
    password:   { type: String, required: "The password is required"},
    tokens:     [ { token: { type: String, required: true } }],
    company:    { type: String },
    status:     { type: String, default: true},
    wishList:   [{ 
        productName:    { type: String, required: "The productName is required" }, 
        desiredPrice:   { type: Number },
        quantity:       { type: Number },
        metric:         { type: String, enum: metrics, required: 'Enter a metric' },
        description:    { type: String }
     }]
}, {
    timestamps: true
});


userSchema.pre<IUser>('save', async function (next) {
    // Hash the password before saving the user model
    const user = this;
    if (user.isModified('password')) {
        user.password = await Bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = JWT.sign({_id: user._id}, config.auth.token_key)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.removeAuthToken = async function(token: string): Promise<IUser> {
    // Remove an auth token for the user
    const user: IUser = this;
    user.tokens = user.tokens.filter((t: any) => t.token !== token)
    return user.save()
}

userSchema.methods.validatePassword =  async function(password: string): Promise<boolean>{
    return Bcrypt.compare(password, this.password)
}

const User = model<IUser>('User', userSchema);
export default User;





