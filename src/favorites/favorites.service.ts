import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { Store } from 'src/store';
import { Artist, Album, Track } from 'src/models';

@Injectable()
export class FavoritesService {
  create(id: string, type: string) {
    switch (type) {
      case 'track':
        Store.tracks.forEach((track) => {
          if (track.id === id) {
            Store.favorites.tracks.push(id);
          }
        });
        break;
      case 'artist':
        Store.artists.forEach((artist) => {
          if (artist.id === id) {
            Store.favorites.artists.push(id);
          }
        });
        break;
      case 'album':
        Store.albums.forEach((album) => {
          if (album.id === id) {
            Store.favorites.albums.push(id);
          }
        });
        break;
      default:
        return null;
    }
  }

  findAll() {
    const result = { artists: [], albums: [], tracks: [] };

    Store.favorites.tracks.forEach((trackId) => {
      const track = Store.tracks.find((track) => {
        return track.id === trackId;
      });
      if (track) {
        result.tracks.push(track);
      }
    });

    Store.favorites.artists.forEach((artistId) => {
      const artist = Store.artists.find((artist) => {
        return artist.id === artistId;
      });
      if (artist) {
        result.artists.push(artist);
      }
    });

    Store.favorites.albums.forEach((albumId) => {
      const album = Store.albums.find((album) => {
        return album.id === albumId;
      });
      if (album) {
        result.albums.push(album);
      }
    });

    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }
}
