import {Component, OnInit} from '@angular/core';
import {Playlists} from '../../models/playlists/playlists.interface.model';
import {PlaylistService} from '../../services/playlist/playlist.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  public playlists: Playlists;

  constructor(private playlistService: PlaylistService) {
    this.playlists = {
      playlists: [],
      length: 0
    }
  }

  ngOnInit() {
    this.playlistService.getPlaylists().then(playlists => this.playlists = playlists);
  }

}
