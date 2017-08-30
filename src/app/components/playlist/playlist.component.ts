import {Component} from '@angular/core';
import {Playlist} from '../../models/playlist/playlist.interface.model';
import {TrackService} from '../../services/track/track.service';
import {Tracks} from '../../models/tracks/tracks.interface.model';
import {TracksImpl} from '../../models/tracks/tracks.model';
import {MdDialog, MdDialogRef} from '@angular/material';
import {AddTrackDialogComponent} from '../../dialogs/add-track.dialog/add-track.dialog.component';
import {AppConstants} from '../../app.constants';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {

  public playlist: Playlist;
  public tracks: Tracks;

  private addTrackDialogRef: MdDialogRef<AddTrackDialogComponent>;

  constructor(public dialog: MdDialog, private trackService: TrackService) {
    this.setEmptyTracklists();
  }

  public onAddTrack(): void {
    this.addTrackDialogRef = this.dialog.open(AddTrackDialogComponent, {
      disableClose: false,
      width: AppConstants.DIALOG_WIDTH
    });

    this.addTrackDialogRef.afterClosed().subscribe(track => {
        if (track) {
          console.log('Adding this track: ', track);
        }
        this.addTrackDialogRef = null
      }
    );
  }

  public setPlaylist(playlist: Playlist): void {
    console.log('New Playlist is set: ', playlist);

    this.playlist = playlist;
    this.trackService.getTracksForPlaylist(this.playlist)
      .then(tracks => this.setTracks(tracks))
      .catch(any => this.setEmptyTracklists());
  }

  private setTracks(tracks: Tracks): void {
    console.log('New tracks are set: ', tracks);
    this.tracks = tracks;
  }

  private setEmptyTracklists(): void {
    this.tracks = new TracksImpl();
  }
}
