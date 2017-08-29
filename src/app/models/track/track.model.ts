import {Track} from './track.interface';

export class TrackImpl implements Track {
  title: string;
  performer: string;
  duration: number;
  album: string;
  playcount: number;
  publicationDate: string;
  description: string;
  offlineAvailable: boolean;

  constructor() {
    this.title = '';
    this.performer = '';
    this.duration = 0;
    this.album = '';
    this.playcount = undefined;
    this.publicationDate = undefined;
    this.description = undefined;
    this.offlineAvailable = false;
  }
}
