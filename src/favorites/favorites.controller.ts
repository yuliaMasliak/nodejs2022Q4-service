import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Header,
  HttpCode,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { checkEntity, isValidUUID } from 'src/helpers';
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
    checkEntity(type, id);
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

  @Delete(':type/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('type') type: 'track' | 'album' | 'artist',
    @Param('id') id: string,
  ) {
    isValidUUID(id);
    checkEntity(type, id);
    let newFavorite: boolean | null;
    switch (type) {
      case 'track':
        newFavorite = this.favoritesService.remove(id, 'track');
        break;
      case 'album':
        newFavorite = this.favoritesService.remove(id, 'album');
        break;
      case 'artist':
        newFavorite = this.favoritesService.remove(id, 'artist');
        break;
      default:
        break;
    }
    console.log(newFavorite);

    if (!newFavorite) {
      throw new NotFoundException('Does not exist');
    }
  }
}
