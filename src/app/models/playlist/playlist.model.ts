import {Playlist} from './playlist.interface.model';

export class PlaylistImpl implements Playlist {
  id: number;
  name: string;
  owner: boolean;

  constructor(name: string) {
    this.id = -1;
    this.name = name;
    this.owner = false;
  }
}
