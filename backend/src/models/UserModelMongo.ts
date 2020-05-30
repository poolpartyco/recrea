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

const userSchema = new Schema({
    nickname:   { type: String, required: "The nickname is required", unique: "The nickname must be unique" },
    firstName:  { type: String, required: "The first Name is required" },
    lastName:   { type: String },
    phone:      { type: String  },
    email:      { type: String, required: "The email is required", unique: true },
    password:   { type: String, required: "The password is required"},
    tokens:     [ { token: { type: String, required: true } }],
    company:    { type: String },
    status:     { type: String, default: true},
    wishList:   [{ 
        productName:    { type: String, required: "The productName is required" }, 
        desiredPrice:   { type: Number },
        quantity:       { type: Number },
        description:    { type: String  }
     }]
}, {
    timestamps: true
});


export default model<IUser>('User', userSchema);





