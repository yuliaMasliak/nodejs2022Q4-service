import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto';

export class TrackEntity {
  id: string = uuidv4(); // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number

  constructor(data: CreateTrackDto) {
    this.name = data.name;
    this.artistId = data.artistId;
    this.albumId = data.albumId;
    this.duration = data.duration;
  }
}
