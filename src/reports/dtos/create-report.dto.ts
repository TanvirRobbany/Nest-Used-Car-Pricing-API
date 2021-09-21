import { IsString, IsNumber, Min, Max, IsLongitude, IsLatitude } from "class-validator";

export class CreateReportDto {
    @IsString()
    @Min(0)
    @Max(1000000)
    price: string;

    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(2021)
    year: number;

    @IsLongitude()
    longitude: number;

    @IsLatitude()
    latitude: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

}