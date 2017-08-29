import {Track} from '../track/track.model';

export class PlaylistImpl {
  id: number;
  name: string;
  owner: boolean;
  tracks: Track[];

  constructor(name: string) {
    this.id = -1;
    this.name = name;
    this.owner = false;
    this.tracks = [];
  }
}
