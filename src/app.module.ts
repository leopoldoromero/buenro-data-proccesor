import { Module } from '@nestjs/common';
import { IngestedDataModule } from './ingested_data/IngestedData.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    ScheduleModule.forRoot(),
    IngestedDataModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
