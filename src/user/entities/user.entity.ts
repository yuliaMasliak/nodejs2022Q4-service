import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';

export class CreateUserEntity {
  id: string = uuidv4();
  login: string;
  password: string;
  version: number = 1;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  constructor(data: CreateUserDto) {
    this.login = data.login;
    this.password = data.login;
  }
}
