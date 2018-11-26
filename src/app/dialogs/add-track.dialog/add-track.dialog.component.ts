import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Track} from '../../models/track/track.interface';
import {TrackService} from '../../services/track/track.service';
import {Playlist} from '../../models/playlist/playlist.interface.model';
import {Tracks} from '../../models/tracks/tracks.interface.model';
import {TracksImpl} from '../../models/tracks/tracks.model';
import {TracksDataSource} from '../../data-sources/tracks/tracks.datasource';
import {TrackImpl} from '../../models/track/track.model';

@Component({
  templateUrl: './add-track.dialog.component.html',
  styleUrls: ['./add-track.dialog.component.scss']
})
export class AddTrackDialogComponent {

  public track: Track;
  public tracks: Tracks;
  public playlist: Playlist;

  displayedColumns = ['title', 'performer', 'album', 'description'];
  dataSource = undefined;

  constructor(private dialogRef: MatDialogRef<AddTrackDialogComponent>,
              private trackService: TrackService) {
    this.setEmptyTracklists();
  }

  public onOk(): void {
    this.dialogRef.close(this.track);
  }

  public setPlaylist(playlist: Playlist): void {
    this.playlist = playlist;
    this.trackService.getAllTracks(playlist).then(tracks => this.setTracks(tracks))
      .catch(any => this.setEmptyTracklists());
  }

  public onSelectTrack(track: Track): void {
    const selectedTrack = new TrackImpl();
    selectedTrack.id = track.id;
    selectedTrack.title = track.title;
    selectedTrack.performer = track.performer;
    this.track = selectedTrack;
  }

  private setTracks(tracks: Tracks): void {
    this.dataSource = new TracksDataSource(tracks);
    this.tracks = tracks;
  }

  private setEmptyTracklists(): void {
    this.tracks = new TracksImpl();
  }
}

