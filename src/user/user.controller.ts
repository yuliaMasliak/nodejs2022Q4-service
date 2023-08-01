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
      throw new BadRequestException('Missing required fields');
    }
  }

  @Get()
  @Header('Content-Type', 'application/json')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    isValidUUID(id);
    const user = this.userService.findOne(id);
    if (user === undefined) {
      throw new NotFoundException('User not found');
    } else {
      return user;
    }
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    isValidUUID(id);
    const user = this.userService.update(id, updateUserDto);
    if (user === null) {
      throw new BadRequestException('Missing required fields');
    } else if (user === undefined) {
      throw new NotFoundException('User not found');
    } else if (user === false) {
      throw new ForbiddenException('Wrong data');
    } else {
      return user;
    }
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    isValidUUID(id);
    const user = this.userService.remove(id);
    if (user === undefined) {
      throw new NotFoundException('Not Found');
    }
  }
}
