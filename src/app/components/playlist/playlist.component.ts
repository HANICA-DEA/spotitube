import {Component, OnInit} from '@angular/core';
import {Playlist} from '../../models/playlist/playlist.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  public playlist: Playlist;

  constructor() {
  }

  ngOnInit() {
  }

}
