import * as mongosse from 'mongoose';

export const ReportSchema = new mongosse.Schema({
    price: String,
    make: String,
    model: String,
    year: Number,
    longitude: Number, 
    latitude: Number,
    mileage: Number
})

export interface Report {
    _id: string;
    price: string;
    make: string;
    model: string;
    year: number;
    longitude: number;
    latitude: number;
    mileage: number;
}