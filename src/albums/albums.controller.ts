import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  Header,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { isValidUUID } from 'src/helpers';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createalbumDto: CreateAlbumDto) {
    const newalbum = this.albumsService.create(createalbumDto);
    if (newalbum !== null) {
      return newalbum;
    } else {
      throw new BadRequestException('New album data fields required');
    }
  }

  @Get()
  @Header('Content-Type', 'application/json')
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    isValidUUID(id);
    const album = this.albumsService.findOne(id);
    if (album === undefined) {
      throw new NotFoundException('album does not exist');
    } else {
      return album;
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    isValidUUID(id);
    const album = this.albumsService.update(id, updateAlbumDto);
    if (album === undefined) {
      throw new NotFoundException('album does not exist');
    } else if (album === null) {
      throw new BadRequestException('Required fields missing');
    } else {
      return album;
    }
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    isValidUUID(id);
    const album = this.albumsService.remove(id);
    if (album === undefined) {
      throw new NotFoundException('Album does not exist');
    }
  }
}
