import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Store } from 'src/store';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  create(CreatealbumDto: CreateAlbumDto) {
    if (CreatealbumDto.name && CreatealbumDto.year) {
      const newalbum = new AlbumEntity(CreatealbumDto);
      Store.albums.push(newalbum);
      return newalbum;
    } else {
      return null;
    }
  }

  findAll() {
    return Store.albums;
  }

  findOne(id: string) {
    const album = Store.albums.find((album) => {
      return album.id === id;
    });
    if (!album) {
      return undefined;
    }
    return album;
  }

  update(id: string, UpdatealbumDto: UpdateAlbumDto) {
    let index: number;
    const album = Store.albums.find((album, i) => {
      index = i;
      return album.id === id;
    });
    console.log(UpdatealbumDto);

    if (
      !UpdatealbumDto.name ||
      !UpdatealbumDto.year ||
      typeof UpdatealbumDto.name !== 'string'
    ) {
      return null;
    }
    if (!album) {
      return undefined;
    }
    album.name = UpdatealbumDto.name;
    album.year = UpdatealbumDto.year;
    album.artistId = UpdatealbumDto.artistId;
    Store.albums.splice(index, 1, album);
    return album;
  }

  remove(id: string) {
    let index: number;
    const album = Store.albums.find((album, i) => {
      index = i;
      return album.id === id;
    });
    if (!album) {
      return undefined;
    }
    Store.updateTracksWithAlbum(album.id);
    Store.removeAlbumsFromFavs(album.id);
    Store.albums.splice(index, 1);
    return true;
  }
}
