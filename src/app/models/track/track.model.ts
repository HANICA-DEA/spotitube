import {Song} from '../song/song.model';
import {Video} from '../video/video.model';

export interface Track {
  performer: string;
  title: string;
  url: string;
  duration: number;
  availability: boolean;
  song?: Song;
  video?: Video;
}
