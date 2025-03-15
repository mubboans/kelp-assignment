import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dbConfig } from './config/db-config';
import { UsersModule } from './modules/users/users.module';
import { CsvToJsonModule } from './modules/csv-to-json/csv-to-json.module';

@Module({
  imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:(config: ConfigService)=>dbConfig(config)
        }),
        UsersModule,
        CsvToJsonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
