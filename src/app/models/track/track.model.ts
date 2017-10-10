import {Track} from './track.interface';

export class TrackImpl implements Track {
  id: number;
  title: string;
  performer: string;
  duration: number;
  album: string;
  playcount: number;
  publicationDate: string;
  description: string;
  offlineAvailable: boolean;

  constructor() {
    this.id = -1;
    this.title = '';
    this.performer = '';
    this.duration = 0;
    this.album = undefined;
    this.playcount = undefined;
    this.publicationDate = undefined;
    this.description = undefined;
    this.offlineAvailable = false;
  }
}
