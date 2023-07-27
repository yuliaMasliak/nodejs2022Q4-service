import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserEntity } from './entities/user.entity';
import { User } from 'src/models';
import { getTimeStamp } from 'src/helpers';
import { Store } from 'src/store';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    if (createUserDto.login && createUserDto.password) {
      const newUser = new CreateUserEntity(createUserDto);
      Store.users.push(newUser);
      const response = { ...newUser };
      delete response.password;
      return response;
    } else {
      return null;
    }
  }

  findAll() {
    return Store.users;
  }

  findOne(id: string) {
    const user = Store.users.find((user) => {
      return user.id === id;
    });
    if (!user) {
      return undefined;
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    let index: number;
    const user = Store.users.find((user, i) => {
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
      Store.users.splice(index, 1, user);
      const response = { ...user };
      delete response.password;
      return response;
    }
  }

  remove(id: string) {
    let index: number;
    const user = Store.users.find((user, i) => {
      index = i;
      return user.id === id;
    });
    if (!user) {
      return undefined;
    }
    Store.users.splice(index, 1);
    return true;
  }
}
