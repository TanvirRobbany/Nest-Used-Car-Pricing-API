import { Controller, Body, Post } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';

@Controller('reports')
export class ReportsController {
    @Post()
    createReport(@Body() body: CreateReportDto) {

    }
}
