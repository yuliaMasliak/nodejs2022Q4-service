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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { isValidUUID } from 'src/helpers';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtistDto: CreateArtistDto) {
    const newArtist = this.artistsService.create(createArtistDto);
    if (newArtist !== null) {
      return newArtist;
    } else {
      throw new BadRequestException('New artist data fields required');
    }
  }

  @Get()
  @Header('Content-Type', 'application/json')
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    isValidUUID(id);
    const artist = this.artistsService.findOne(id);
    if (artist === undefined) {
      throw new NotFoundException('Artist does not exist');
    } else {
      return artist;
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    isValidUUID(id);
    const artist = this.artistsService.update(id, updateArtistDto);
    if (artist === undefined) {
      throw new NotFoundException('Artist does not exist');
    } else if (artist === null) {
      throw new BadRequestException('Required fields missing');
    } else {
      return artist;
    }
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    isValidUUID(id);
    const artist = this.artistsService.remove(id);
    if (artist === undefined) {
      throw new NotFoundException('Artist does not exist');
    }
  }
}
