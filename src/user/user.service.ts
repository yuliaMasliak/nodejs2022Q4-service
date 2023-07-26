import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  private users = [];

  create(createUserDto: CreateUserDto) {
    if (createUserDto.login && createUserDto.password) {
      const newUser = new CreateUserEntity(createUserDto);
      console.log(newUser);
      this.users.push(newUser);
      return newUser;
    } else {
      return null;
    }
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => {
      return user.id === id;
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
