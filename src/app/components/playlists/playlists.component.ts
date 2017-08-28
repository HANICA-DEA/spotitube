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

  /**
   * Change the name of a playlist.
   *
   * @param {Playlist} playlist
   */
  public onEditName(playlist: Playlist): void {
    console.log('Editing name of playlist: ', playlist);
  }

  /**
   * Delete a playlist.
   *
   * @param {Playlist} playlist
   */
  onDelete(playlist: Playlist): void {
    this.playlistService.deletePlaylist(playlist).then(playlists => this.setPlaylists(playlists))
      .catch(any => {
      });
  }

  /**
   * Create a new playlist.
   */
  public onNewPlaylist(): void {

  }

  /**
   * Select a playlist from the list.
   *
   * @param {Playlist} playlist
   */
  public onPlaylistSelected(playlist: Playlist): void {
    this.selectedPlaylistChange.emit(playlist);
  }

  private setPlaylists(playlists: Playlists): void {
    this.playlists = playlists;

    console.log('Setting new playlists: ', playlists);

    if (playlists.playlists.length > 0) {
      const firstPlaylist = playlists.playlists[0];

      this.onPlaylistSelected(firstPlaylist)
    } else {
      this.onPlaylistSelected(undefined);
    }
  }

  private setEmptyPlaylists(): void {
    this.playlists = {
      playlists: [],
      length: 0
    }
  }


}
