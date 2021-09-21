import { Injectable, NotFoundException, Session } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './schemas/report.schema';

@Injectable()
export class ReportsService {
    constructor(@InjectModel('Reports') private repo: Model<Report>) { }

    async create(reportDto: CreateReportDto, session: any) {
        const userId = {user: session.userId};
        const userAssignedReport = Object.assign(reportDto, userId)
        const newReport = new this.repo(userAssignedReport);

        const report = await newReport.save()
        
        return report;
    }
}
