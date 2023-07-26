import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate as isUUID } from 'uuid';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    const newUser = this.userService.create(createUserDto);
    if (newUser !== null) {
      return newUser;
    } else {
      throw new BadRequestException('User data fields required');
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.userService.findOne(id);
    if (user === null) {
      throw new BadRequestException('Not UUID type of user id');
    } else if (user === undefined) {
      throw new NotFoundException('No user with such id');
    } else {
      return user;
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!isUUID(id)) {
      throw new BadRequestException('Not UUID type of user id');
    }
    const user = this.userService.update(id, updateUserDto);
    if (user === null) {
      throw new ForbiddenException('Wrong old password');
    } else if (user === undefined) {
      throw new NotFoundException('No user with such id');
    } else {
      return user;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
