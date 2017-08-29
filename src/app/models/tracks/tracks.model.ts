import {Tracks} from './tracks.interface.model';
import {Track} from '../track/track.model';

export class TracksImpl implements Tracks {
  tracks: Track[];

  constructor() {
    this.tracks = [];
  }
}
