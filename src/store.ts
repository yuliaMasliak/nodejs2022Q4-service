import { Artist, Track, User, Album } from './models';

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
  albums: Album[] = [];

  updateStoreWithArtist(artistId: string) {
    this.tracks.forEach((track) => {
      if (track.artistId == artistId) {
        track.artistId = null;
      }
    });
    this.albums.forEach((album) => {
      if (album.artistId == artistId) {
        album.artistId = null;
      }
    });
  }
  updateTracksWithAlbum(albumId: string) {
    this.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }
}

export const Store = new Storage();
