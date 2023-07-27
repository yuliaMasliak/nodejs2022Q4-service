import { Artist, User, Album, Favorites, Track } from './models';

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
  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

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
  removeTrackFromFavs(id: string) {
    let index: number;
    const track = this.favorites.tracks.find((trackId, i) => {
      index = i;
      return trackId === id;
    });
    if (track) {
      this.favorites.tracks.splice(index, 1);
      return true;
    }
    return false;
  }
  removeAlbumsFromFavs(id: string) {
    let index: number;
    const album = this.favorites.albums.find((albumId, i) => {
      index = i;
      return albumId === id;
    });
    if (album) {
      this.favorites.albums.splice(index, 1);
      return true;
    }
    return false;
  }
  removeArtistsFromFavs(id: string) {
    let index: number;
    const artist = this.favorites.artists.find((artistId, i) => {
      index = i;
      return artistId === id;
    });
    if (artist) {
      this.favorites.artists.splice(index, 1);
      return true;
    }
    return false;
  }
}
export const Store = new Storage();
