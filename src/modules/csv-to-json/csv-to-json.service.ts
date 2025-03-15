import { BadGatewayException, BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CsvToJsonService {
    constructor(private readonly configService: ConfigService, @InjectRepository(User) private userModel: Repository<User>,) { }

    async parseCSV(): Promise<any> {
        try {
            const header_mandatory_field = ['name.firstName', 'name.lastName', 'age']
            const filePath = this.configService.get<string>('CSV_FILE_PATH');
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const lines = fileContent.split('\n').filter(line => line.trim());
            const headers = lines[0].split(',').map(header => header.trim());
            if (!this.checkRequiredProperty(headers, header_mandatory_field)){
                throw new BadRequestException('CSV should contain required field')
            }
            let users: User[] = [];
            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',').map(value => value.trim());
                let record: any = {};
                headers.forEach((header, index) => {
                    const keys = header.split('.');
                    let temp = record;

                    keys.forEach((key, j) => {
                        if (j === keys.length - 1) {
                            temp[key] = values[index];
                        } else {
                            temp[key] = temp[key] || {};
                            temp = temp[key];
                        }
                    });
                });
                const user = new User();
                user.name = `${record.name?.firstName} ${record.name?.lastName}`;
                user.age = parseInt(record.age, 10);
                user.address = record.address || null;
                delete record.name;
                delete record.age;
                delete record.address;
                user.additional_info = record;

                users.push(user);
            }
            await this.userModel.save(users);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    checkRequiredProperty(headers: string[],property_to_check: string []): boolean{
        let flag_check = true;
        property_to_check.forEach((property)=>{
            if (!headers.includes(property)) {
                flag_check = false
            }
        })
        return flag_check
    }
}
