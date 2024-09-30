import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})


export interface User extends Document{
    userName: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    isMsgAccesspting: boolean,
    message: Message[]
}

const UserSchema: Schema<User> = new Schema(
    {
        userName: {
            type: String,
            required: [true, 'User name is required'],
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            match: [ /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/ , 'please enter valid email address' ]
        },
        password: {
            type: String,
            required: [true, 'password is required'],
        },
        verifyCode: {
            type: String,
            required: [true, 'verify Code is required'],
        },
        verifyCodeExpiry: {
            type: Date,            
            required: [true, 'verify Code expiry is required'],
        },
        isVerified: {
            type: Boolean,            
            default: false
        },
        isMsgAccesspting: {
            type: Boolean,            
            default: true
        },
        message: [MessageSchema]
    }
)

const UserModel = 
( mongoose.models.User as mongoose.Model<User> ) || 
( mongoose.model<User>( "User", UserSchema ) )


export default UserModel