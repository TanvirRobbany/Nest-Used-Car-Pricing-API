import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
})

export interface User {
    _id: string;
    email: string;
    password: string;
}