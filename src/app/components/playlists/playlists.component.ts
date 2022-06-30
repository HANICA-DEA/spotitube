import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Playlists} from '../../models/playlists/playlists.interface.model';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {Playlist} from '../../models/playlist/playlist.interface.model';
import {EditPlaylistDialogComponent} from '../../dialogs/edit-playlist.dialog/edit-playlist.dialog.component';
import {AppConstants} from '../../app.constants';
import {NewPlaylistDialogComponent} from '../../dialogs/new-playlist.dialog/new-playlist.dialog.component';
import {PlaylistImpl} from '../../models/playlist/playlist.model';
import {PlaylistsImpl} from '../../models/playlists/playlists.model';
import {TrackService} from '../../services/track/track.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  public playlists: Playlists;

  public selectedPlayistId: number;

  private editPlaylistDialogRef: MatDialogRef<EditPlaylistDialogComponent>;
  private newPlaylistDialogRef: MatDialogRef<NewPlaylistDialogComponent>;

  @Output() selectedPlaylistChange = new EventEmitter<Playlist>();

  constructor(private playlistService: PlaylistService,
              private tracksService: TrackService,
              public dialog: MatDialog) {
    this.setEmptyPlaylists();
  }

  ngOnInit() {
    this.updatePlaylists()
    this.tracksService.tracksUpdated$.subscribe(tracks => this.updatePlaylists());

  }

  /**
   * Change the name of a playlist.
   *
   * @param {Playlist} playlist
   */
  public onEditName(playlist: Playlist): void {
    this.editPlaylistDialogRef = this.dialog.open(EditPlaylistDialogComponent, {
      disableClose: false,
      width: AppConstants.DIALOG_WIDTH
    });

    this.editPlaylistDialogRef.componentInstance.name = playlist.name;

    this.editPlaylistDialogRef.afterClosed().subscribe(name => {
        if (name) {
          playlist.name = name;
          this.playlistService.updatePlaylist(playlist)
            .then(playlists => this.setPlaylists(playlists))
            .catch(any => {
              }
            );
        }
        this.editPlaylistDialogRef = null
      }
    );
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
    this.newPlaylistDialogRef = this.dialog.open(NewPlaylistDialogComponent, {
      disableClose: false,
      width: AppConstants.DIALOG_WIDTH
    });


    this.newPlaylistDialogRef.afterClosed().subscribe(name => {
        if (name) {
          const playlist = new PlaylistImpl(name);
          this.playlistService.newPlaylist(playlist)
            .then(playlists => this.setPlaylists(playlists))
            .catch(any => {
              }
            );
        }
        this.newPlaylistDialogRef = null
      }
    );
  }

  private updatePlaylists(): void {
    this.playlistService.getPlaylists().then(playlists => this.setPlaylists(playlists))
      .catch(any => this.setEmptyPlaylists());
  }

  /**
   * Select a playlist from the list.
   *
   * @param {Playlist} playlist
   */
  public onPlaylistSelected(playlist: Playlist): void {
    this.selectedPlaylistChange.emit(playlist);
    if (playlist) {
      this.selectedPlayistId = playlist.id;
    } else {
      this.selectedPlayistId = undefined;
    }
  }

  private setPlaylists(playlists: Playlists): void {
    this.playlists = playlists;

    if (playlists.playlists.length > 0) {

      let playlistToSelect = playlists.playlists[0];

      if (this.selectedPlayistId) {
        for (const playlist of this.playlists.playlists) {
          if (playlist.id === this.selectedPlayistId) {
            playlistToSelect = playlist;
            break;
          }
        }
      }

      this.onPlaylistSelected(playlistToSelect)
    } else {
      this.onPlaylistSelected(undefined);
    }
  }

  private setEmptyPlaylists(): void {
    this.playlists = new PlaylistsImpl();
  }
}
