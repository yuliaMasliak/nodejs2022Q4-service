import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  HttpCode,
  HttpStatus,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { IsUUID } from 'class-validator';
import { checkServerIdentity, isValidUUID } from 'src/helpers';
import { Favorites } from 'src/models';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':type/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('type') type: 'track' | 'album' | 'artist',
    @Param('id') id: string,
  ) {
    isValidUUID(id);
    checkServerIdentity(type, id);
    let newFavorite: Favorites | null;
    switch (type) {
      case 'track':
        newFavorite = this.favoritesService.create(id, 'track');
        break;
      case 'album':
        newFavorite = this.favoritesService.create(id, 'album');
        break;
      case 'artist':
        newFavorite = this.favoritesService.create(id, 'artist');
        break;
      default:
        break;
    }

    if (newFavorite !== null) {
      return newFavorite;
    } else {
      throw new HttpException(
        'Does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.favoritesService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritesService.remove(+id);
  }
}
