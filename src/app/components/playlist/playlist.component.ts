import {Component} from '@angular/core';
import {Playlist} from '../../models/playlist/playlist.interface.model';
import {TrackService} from '../../services/track/track.service';
import {Tracks} from '../../models/tracks/tracks.interface.model';
import {TracksImpl} from '../../models/tracks/tracks.model';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AddTrackDialogComponent} from '../../dialogs/add-track.dialog/add-track.dialog.component';
import {Track} from '../../models/track/track.interface';
import {TracksDataSource} from '../../data-sources/tracks/tracks.datasource';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {

  public playlist: Playlist;
  public tracks: Tracks;


  displayedColumns = ['title', 'performer', 'duration', 'album', 'playcount',
    'publicationDate', 'description', 'offlineAvailable', 'delete'];
  dataSource = undefined;

  private addTrackDialogRef: MatDialogRef<AddTrackDialogComponent>;

  constructor(public dialog: MatDialog, private trackService: TrackService) {
    this.setEmptyTracklists();
  }

  public onAddTrack(): void {
    this.addTrackDialogRef = this.dialog.open(AddTrackDialogComponent, {
      disableClose: false,
    });

    this.addTrackDialogRef.componentInstance.setPlaylist(this.playlist);
    this.addTrackDialogRef.afterClosed().subscribe(track => {
        if (track) {
          console.log('Adding this track: ', track);
          this.trackService.addTrackToPlaylist(this.playlist, track)
            .then(tracks => this.setTracks(tracks))
            .catch(any => {
            });
        }
        this.addTrackDialogRef = null
      }
    );
  }

  public onRemoveTrack(track: Track): void {
    this.trackService.removeTracksFromPlaylist(this.playlist, track)
      .then(tracks => this.setTracks(tracks))
      .catch(any => {
      });
  }

  public setPlaylist(playlist: Playlist): void {

    this.playlist = playlist;
    this.trackService.getTracksForPlaylist(this.playlist)
      .then(tracks => this.setTracks(tracks))
      .catch(any => this.setEmptyTracklists());
  }

  private setTracks(tracks: Tracks): void {
    if (tracks) {
      this.dataSource = new TracksDataSource(tracks);
      this.tracks = tracks;
    } else {

    }
  }

  private setEmptyTracklists(): void {
    this.tracks = new TracksImpl();
  }
}
