import * as mongosse from 'mongoose';

export const ReportSchema = new mongosse.Schema({
    make: String,
    model: String,
    mileage: Number,
    year: Number,
    longitude: Number, 
    latitude: Number,
    price: Number
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