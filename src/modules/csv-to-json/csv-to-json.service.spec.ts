import { Test, TestingModule } from '@nestjs/testing';
import { CsvToJsonService } from './csv-to-json.service';

describe('CsvToJsonService', () => {
  let service: CsvToJsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsvToJsonService],
    }).compile();

    service = module.get<CsvToJsonService>(CsvToJsonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
