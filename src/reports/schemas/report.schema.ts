import * as mongosse from 'mongoose';

export const ReportSchema = new mongosse.Schema({
    price: String,
})

export interface Report {
    price: string;
}