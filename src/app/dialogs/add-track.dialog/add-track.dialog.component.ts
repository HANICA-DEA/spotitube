import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {Track} from '../../models/track/track.interface';
import {TrackImpl} from '../../models/track/track.model';
import {TrackService} from '../../services/track/track.service';
import {Playlist} from '../../models/playlist/playlist.interface.model';
import {Tracks} from '../../models/tracks/tracks.interface.model';
import {TracksImpl} from '../../models/tracks/tracks.model';
import {TracksDataSource} from '../../data-sources/tracks/tracks.datasource';

@Component({
  templateUrl: './add-track.dialog.component.html'
})
export class AddTrackDialogComponent {

  public track: Track;
  public tracks: Tracks;
  public playlist: Playlist;

  displayedColumns = ['title', 'performer', 'duration', 'album', 'playcount', 'publicationDate', 'description'];
  dataSource = undefined;

  constructor(private dialogRef: MdDialogRef<AddTrackDialogComponent>,
              private trackService: TrackService) {
    this.track = new TrackImpl();
    this.setEmptyTracklists();
  }

  public onOk(): void {
    this.dialogRef.close(this.track);
  }

  public setPlaylist(playlist: Playlist): void {
    this.playlist = playlist
    this.trackService.getAllTracks(this.playlist).then(tracks => this.setTracks(tracks))
      .catch(any => this.setEmptyTracklists());
  }

  public onSelectTrack(track: Track): void {
    console.log('Selected track: ', track);
    this.track = track;
  }

  private setTracks(tracks: Tracks): void {
    console.log('Settings tracks on dialog: ', tracks);
    this.dataSource = new TracksDataSource(tracks);
    this.tracks = tracks;
  }

  private setEmptyTracklists(): void {
    this.tracks = new TracksImpl();
  }
}

