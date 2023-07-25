import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../user.service';
import { User } from '../entities/user.entity';

export class userData {
  login: string;
  password: string;
}

export class CreateUserDto {
  id: string = uuidv4();
  login: string;
  password: string;
  version: number = 1;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  constructor(data: userData) {
    this.login = data.login;
    this.password = data.login;
  }
}
