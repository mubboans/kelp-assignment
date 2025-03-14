import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
console.log(process.env.DB_PASSWORD,'process.env.DB_PASSWORD');

@Module({
  imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [User],
            synchronize: true, // Set to false in production
        }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
