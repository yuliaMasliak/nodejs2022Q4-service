import { Artist, Track, User } from './models';

export class Storage {
  users: User[] = [
    {
      id: '80eb77de-617b-4551-b0cc-0d20c921bfbe',
      version: 1,
      login: 'Yulia',
      password: '12345',
      createdAt: 1690358040,
      updatedAt: 1690358040,
    },
    {
      id: '37eb77de-617b-4551-b0cc-0d20c921bfbe',
      version: 1,
      login: 'Masha',
      password: '12345',
      createdAt: 1690358040,
      updatedAt: 1690358040,
    },
  ];
  tracks: Track[] = [];
  artists: Artist[] = [];

  updateTracksWithArtist(artistId: string) {
    console.log(this.tracks);

    this.tracks.forEach((track) => {
      console.log(track);
      if (track.artistId == artistId) {
        track.artistId = null;
      }
    });
  }
}

export const Store = new Storage();
