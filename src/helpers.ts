import { validate as isUUID } from 'uuid';
import {
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Store } from './store';

export function isValidUUID(id: string) {
  if (!isUUID(id)) {
    throw new BadRequestException('Not UUID type of user id');
  }
}
export function getTimeStamp() {
  const currentDate = new Date();
  const currentTimestamp = currentDate.getTime();
  return currentTimestamp;
}

export function checkEntity(type: string, id: string) {
  switch (type) {
    case 'track':
      const track = Store.tracks.find((track) => {
        return track.id === id;
      });
      if (track) {
        return true;
      }
      throw new UnprocessableEntityException('Unprocessed entity');
    case 'artist':
      const artist = Store.artists.find((artist) => {
        return artist.id === id;
      });
      if (artist) {
        return true;
      }
      throw new UnprocessableEntityException('Unprocessed entity');
    case 'album':
      const album = Store.albums.find((album) => {
        return album.id === id;
      });
      if (album) {
        return true;
      }
      throw new UnprocessableEntityException('Unprocessed entity');
    default:
      break;
  }
}
