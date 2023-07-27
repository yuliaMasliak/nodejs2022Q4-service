import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserEntity } from './entities/user.entity';
import { User } from 'src/models';
import { getTimeStamp } from 'src/helpers';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: '80eb77de-617b-4551-b0cc-0d20c921bfbe',
      version: 1,
      login: 'Yulia',
      password: '12345',
      createdAt: 1690358040,
      updatedAt: 1690358040,
    },
    {
      id: '37eb77de-617b-4551-b0cc-0d20c921bfbe',
      version: 1,
      login: 'Masha',
      password: '12345',
      createdAt: 1690358040,
      updatedAt: 1690358040,
    },
  ];

  create(createUserDto: CreateUserDto) {
    if (createUserDto.login && createUserDto.password) {
      const newUser = new CreateUserEntity(createUserDto);
      this.users.push(newUser);
      const response = { ...newUser };
      delete response.password;
      return response;
    } else {
      return null;
    }
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((user) => {
      return user.id === id;
    });
    if (!user) {
      return undefined;
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    let index: number;
    const user = this.users.find((user, i) => {
      index = i;
      return user.id === id;
    });
    if (!updateUserDto.oldPassword || !updateUserDto.newPassword) {
      return null;
    }
    if (!user) {
      return undefined;
    } else if (user.password !== updateUserDto.oldPassword) {
      return false;
    } else {
      user.password = updateUserDto.newPassword;
      user.updatedAt = getTimeStamp();
      user.version += 1;
      this.users.splice(index, 1, user);
      const response = { ...user };
      delete response.password;
      return response;
    }
  }

  remove(id: string) {
    let index: number;
    const user = this.users.find((user, i) => {
      index = i;
      return user.id === id;
    });
    if (!user) {
      return undefined;
    }
    this.users.splice(index, 1);
    return true;
  }
}
