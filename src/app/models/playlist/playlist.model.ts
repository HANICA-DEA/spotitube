import {Track} from '../track/track.model';

export interface Playlist {
  id: number;
  name: string;
  tracks: Track[];
}
