import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(private readonly configService: ConfigService, @InjectRepository(User) private userModel: Repository<User>,) { }

    async generateAgeReport(): Promise<Record<string,number> | HttpException> {
        try {
            const users = await this.userModel.find();
            if (users.length === 0) {
                throw new Error("No users found in database.");
            }
            let ageGroups = { "<20": 0, "20-40": 0, "40-60": 0, ">60": 0 };
            users.forEach(user => {
                if (user.age < 20) ageGroups["<20"]++;
                else if (user.age >= 20 && user.age <= 40) ageGroups["20-40"]++;
                else if (user.age >= 40 && user.age <= 60) ageGroups["40-60"]++;
                else ageGroups[">60"]++;
            });
            for(let record in ageGroups){
                ageGroups[record] = Math.round((ageGroups[record] / users?.length) * 100)
            }
            return ageGroups;
        } catch (error) {
            console.error("Error Generating Age Report:", error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async getAllUser(){
        try {
            const users = await this.userModel.find();
            return users;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
