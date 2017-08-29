import {Component, OnInit} from '@angular/core';
import {Playlist} from '../../models/playlist/playlist.interface.model';
import {Track} from '../../models/track/track.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  public playlist: Playlist;
  public tracks: Track[];

  constructor() {
    this.tracks = [];
  }

  ngOnInit() {
  }

  public onAddTrack(): void {
    console.log('A new track shall be added.');
  }

}
