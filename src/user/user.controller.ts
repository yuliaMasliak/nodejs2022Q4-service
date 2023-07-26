import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  Header,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isValidUUID } from '../helpers';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Header('Content-Type', 'application/json')
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
  @Header('Content-Type', 'application/json')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  findOne(@Param('id') id: string) {
    isValidUUID(id);
    const user = this.userService.findOne(id);
    if (user === undefined) {
      throw new NotFoundException('User does not exist');
    } else {
      return user;
    }
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    isValidUUID(id);
    const user = this.userService.update(id, updateUserDto);
    if (user === null) {
      throw new ForbiddenException('Wrong old password');
    } else if (user === undefined) {
      throw new NotFoundException('User does not exist');
    } else {
      return user;
    }
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  remove(@Param('id') id: string) {
    isValidUUID(id);
    const user = this.userService.remove(id);
    if (user === undefined) {
      throw new NotFoundException('User does not exist');
    }
  }
}
