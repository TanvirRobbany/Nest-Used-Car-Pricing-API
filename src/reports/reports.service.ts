import { Injectable, NotFoundException, Session } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './schemas/report.schema';

@Injectable()
export class ReportsService {
    constructor(@InjectModel('Reports') private repo: Model<Report>) { }

    async create(reportDto: CreateReportDto, user: User) {
        reportDto.user = user._id;
        const newReport = new this.repo(reportDto);

        const report = await newReport.save()
        
        return report;
    }
}
