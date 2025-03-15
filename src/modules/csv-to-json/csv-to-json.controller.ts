import { Controller, HttpException, HttpStatus, InternalServerErrorException, Post } from '@nestjs/common';
import { CsvToJsonService } from './csv-to-json.service';


@Controller('csv-to-json')
export class CsvToJsonController {
    constructor(private readonly csvToJsonService: CsvToJsonService) { }

    @Post()
    async parseCVStoJSON(): Promise<any> {
        try {
            await this.csvToJsonService.parseCSV();
            return { success: true, message: 'CSV imported successfully' };
        } catch (error) {
            throw new HttpException({
                success: false,
                message: error.message
            }, error?.status ?? HttpStatus.BAD_REQUEST);
        }
    }
}
