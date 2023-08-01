import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { getTimeStamp } from 'src/helpers';

export class CreateUserEntity {
  id: string = uuidv4();
  login: string;
  password: string;
  version = 1;
  createdAt: number;
  updatedAt: number;

  constructor(data: CreateUserDto) {
    this.login = data.login;
    this.password = data.password;
    this.createdAt = getTimeStamp();
    this.updatedAt = getTimeStamp();
  }
}
