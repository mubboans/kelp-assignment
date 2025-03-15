import { Test, TestingModule } from '@nestjs/testing';
import { CsvToJsonController } from './csv-to-json.controller';
import { CsvToJsonService } from './csv-to-json.service';

describe('CsvToJsonController', () => {
  let controller: CsvToJsonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CsvToJsonController],
      providers: [CsvToJsonService],
    }).compile();

    controller = module.get<CsvToJsonController>(CsvToJsonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
