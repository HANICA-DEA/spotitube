import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {Track} from '../../models/track/track.interface';
import {TrackImpl} from '../../models/track/track.model';
import {TrackService} from '../../services/track/track.service';
import {Playlist} from '../../models/playlist/playlist.interface.model';
import {Tracks} from '../../models/tracks/tracks.interface.model';
import {TracksImpl} from '../../models/tracks/tracks.model';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

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

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class TracksDataSource extends DataSource<any> {

  constructor(private tracks: Tracks) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Track[]> {
    return Observable.of(this.tracks.tracks);
  }

  disconnect() {
  }
}
