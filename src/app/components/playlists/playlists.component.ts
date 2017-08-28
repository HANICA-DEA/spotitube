import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Playlists} from '../../models/playlists/playlists.interface.model';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {Playlist} from '../../models/playlist/playlist.model';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  public playlists: Playlists;

  @Output() selectedPlaylistChange = new EventEmitter<Playlist>();

  constructor(private playlistService: PlaylistService) {
    this.setEmptyPlaylists();
  }

  ngOnInit() {
    this.playlistService.getPlaylists().then(playlists => this.setPlaylists(playlists))
      .catch(any => this.setEmptyPlaylists());
  }

  private setPlaylists(playlists: Playlists): void {
    this.playlists = playlists;

    if (playlists.playlists.length > 0) {
      const firstPlaylist = playlists.playlists;
      const testy: Playlist = firstPlaylist[0];
      console.log('First playlist is: ', testy);

      this.onPlaylistSelected(testy)
    }
  }

  private setEmptyPlaylists(): void {
    this.playlists = {
      playlists: [],
      length: 0
    }
  }

  /**
   *
   * @param {Playlist} playlist
   */
  public onPlaylistSelected(playlist: Playlist): void {
    console.log('Selected the following playlist: ', playlist);
    this.selectedPlaylistChange.emit(playlist);
  }


}
