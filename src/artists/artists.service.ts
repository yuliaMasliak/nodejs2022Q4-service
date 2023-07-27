import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { Store } from 'src/store';

@Injectable()
export class ArtistsService {
  create(CreateArtistDto: CreateArtistDto) {
    if (CreateArtistDto.name && CreateArtistDto.grammy) {
      const newArtist = new ArtistEntity(CreateArtistDto);
      Store.artists.push(newArtist);
      return newArtist;
    } else {
      return null;
    }
  }

  findAll() {
    return Store.artists;
  }

  findOne(id: string) {
    const artist = Store.artists.find((artist) => {
      return artist.id === id;
    });
    if (!artist) {
      return undefined;
    }
    return artist;
  }

  update(id: string, UpdateArtistDto: UpdateArtistDto) {
    let index: number;
    const artist = Store.artists.find((artist, i) => {
      index = i;
      return artist.id === id;
    });
    console.log(UpdateArtistDto);

    if (
      !UpdateArtistDto.name ||
      UpdateArtistDto.grammy === null ||
      UpdateArtistDto.grammy === undefined ||
      typeof UpdateArtistDto.name !== 'string'
    ) {
      return null;
    }
    if (!artist) {
      return undefined;
    }
    artist.name = UpdateArtistDto.name;
    artist.grammy = UpdateArtistDto.grammy;
    Store.artists.splice(index, 1, artist);
    return artist;
  }

  remove(id: string) {
    let index: number;
    const artist = Store.artists.find((artist, i) => {
      index = i;
      return artist.id === id;
    });
    if (!artist) {
      return undefined;
    }
    Store.updateStoreWithArtist(artist.id);
    Store.artists.splice(index, 1);
    return true;
  }
}
