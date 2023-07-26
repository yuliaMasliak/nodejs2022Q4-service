import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';

export class CreateUserEntity {
  id: string = uuidv4();
  login: string;
  password: string;
  version: number = 1;
  createdAt: number;
  updatedAt: number;

  constructor(data: CreateUserDto) {
    this.login = data.login;
    this.password = data.password;
    this.createdAt = this.getDate();
    this.updatedAt = this.getDate();
  }

  getDate() {
    const currentDate = new Date();
    const currentTimestamp = currentDate.getTime();
    return Math.floor(currentTimestamp / 1000);
  }
}
