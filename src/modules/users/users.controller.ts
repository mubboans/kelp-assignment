import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('reports')
  async generateReport() {
    try {
       const report = await this.usersService.generateAgeReport();
        return {
            message:"Report Generated Successfully",
            data:report
        }
    } catch (error) {
        throw new InternalServerErrorException(error?.message) 
    }
  }

  @Get('all')
  async generateR() {
    try {
        const report = await this.usersService.getAllUser();
        return {
            message:"Report Generated Successfully",
            data:report
        }
    } catch (error) {
        throw new InternalServerErrorException(error?.message) 
    }
  }

}
