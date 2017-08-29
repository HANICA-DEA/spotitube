import {Playlist} from '../playlist/playlist.interface.model';
import {Playlists} from './playlists.interface.model';

export class PlaylistsImpl implements Playlists {
  playlists: Playlist[];
  length: number;

  constructor() {
    this.playlists = [];
    this.length = undefined;
  }
}
