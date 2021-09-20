import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
// import { Report } from './report.entity';
import { ReportSchema } from './schemas/report.schema';


@Module({
  // imports: [TypeOrmModule.forFeature([Report])],
  imports: [MongooseModule.forFeature([{name: 'Reports', schema: ReportSchema}])],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule { }
