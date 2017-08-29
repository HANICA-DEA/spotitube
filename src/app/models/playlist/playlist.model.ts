import {Track} from '../track/track.model';

export class PlaylistImpl {
  id: number;
  name: string;
  owner: boolean;

  constructor(name: string) {
    this.id = -1;
    this.name = name;
    this.owner = false;
  }
}
