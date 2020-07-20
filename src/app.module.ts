import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ExercisesModule } from "./exercises/exercises.module";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ExercisesModule, ConfigModule.forRoot(), DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
