import { Module } from '@nestjs/common';
import { CsvToJsonService } from './csv-to-json.service';
import { CsvToJsonController } from './csv-to-json.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';


@Module({
  controllers: [CsvToJsonController],
  providers: [CsvToJsonService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class CsvToJsonModule {}
