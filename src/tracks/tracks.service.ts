import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { Store } from 'src/store';

@Injectable()
export class TracksService {
  create(createTrackDto: CreateTrackDto) {
    if (createTrackDto.name && createTrackDto.duration) {
      const newTrack = new TrackEntity(createTrackDto);
      Store.tracks.push(newTrack);
      return newTrack;
    } else {
      return null;
    }
  }

  findAll() {
    return Store.tracks;
  }

  findOne(id: string) {
    const track = Store.tracks.find((track) => {
      return track.id === id;
    });
    if (!track) {
      return undefined;
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    let index: number;
    const track = Store.tracks.find((track, i) => {
      index = i;
      return track.id === id;
    });
    if (!updateTrackDto.name || !updateTrackDto.duration) {
      return null;
    }
    if (!track) {
      return undefined;
    }
    track.name = updateTrackDto.name;
    track.duration = updateTrackDto.duration;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    Store.tracks.splice(index, 1, track);
    return track;
  }

  remove(id: string) {
    let index: number;
    const track = Store.tracks.find((track, i) => {
      index = i;
      return track.id === id;
    });
    if (!track) {
      return undefined;
    }
    Store.tracks.splice(index, 1);
    Store.removeTrackFromFavs(track.id);
    return true;
  }
}
