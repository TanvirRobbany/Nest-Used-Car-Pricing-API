import * as mongoose from 'mongoose';
import { MongoQueryRunner } from 'typeorm/driver/mongodb/MongoQueryRunner';

export const ReportSchema = new mongoose.Schema({
    make: String,
    model: String,
    mileage: Number,
    year: Number,
    longitude: Number, 
    latitude: Number,
    price: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})

export interface Report {
    _id: string;
    make: string;
    model: string;
    mileage: number;
    year: number;
    longitude: number;
    latitude: number;
    price: number;
}