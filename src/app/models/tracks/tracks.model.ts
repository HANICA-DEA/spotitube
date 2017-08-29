import {Tracks} from './tracks.interface.model';
import {Track} from '../track/track.interface';

export class TracksImpl implements Tracks {
  tracks: Track[];

  constructor() {
    this.tracks = [];
  }
}
