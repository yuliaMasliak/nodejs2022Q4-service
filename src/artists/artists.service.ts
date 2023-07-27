import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { Artist } from 'src/models';
import { TracksService } from 'src/tracks/tracks.service';
import { Store } from 'src/store';

@Injectable()
export class ArtistsService {
  public artists: Artist[] = [];

  constructor(public trackService: TracksService) {}

  create(CreateArtistDto: CreateArtistDto) {
    if (CreateArtistDto.name && CreateArtistDto.grammy) {
      const newArtist = new ArtistEntity(CreateArtistDto);
      this.artists.push(newArtist);
      return newArtist;
    } else {
      return null;
    }
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    const artist = this.artists.find((artist) => {
      return artist.id === id;
    });
    if (!artist) {
      return undefined;
    }
    return artist;
  }

  update(id: string, UpdateArtistDto: UpdateArtistDto) {
    let index: number;
    const artist = this.artists.find((artist, i) => {
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
    this.artists.splice(index, 1, artist);
    return artist;
  }

  remove(id: string) {
    let index: number;
    const artist = this.artists.find((artist, i) => {
      index = i;
      return artist.id === id;
    });
    if (!artist) {
      return undefined;
    }

    Store.updateTracksWithArtist(artist.id);
    this.artists.splice(index, 1);
    return true;
  }
}
