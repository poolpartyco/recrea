/**
 * Importing required interfaces
 */
import { IUser, IUserPrototype } from '../interfaces/UserInterfaces';
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
    const token = JWT.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email: string, password: string) => {
    // Search for a user by email and password.
    const user: IUser = await User.findOne({ email} )
    if (!user) {
        throw new Error('Invalid login credentials');
    }
    const isPasswordMatch = await Bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials');
    }
    return user
}
const User = model<IUser>('User', userSchema)
module.exports = User





