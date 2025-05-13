import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
