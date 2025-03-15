import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiHealth(): string {
    return 'Api Working Fine!';
  }

  parseCSVtoJSon() {

  }

  getUserRecords() {

  }

  createUserRecord() {

  }

  updateUserRecords() {

  }

  deleteUserRecords() {

  }

}
