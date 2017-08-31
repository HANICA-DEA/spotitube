import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {Track} from '../../models/track/track.interface';
import {TrackImpl} from '../../models/track/track.model';
import {TrackService} from '../../services/track/track.service';
import {Playlist} from '../../models/playlist/playlist.interface.model';
import {Tracks} from '../../models/tracks/tracks.interface.model';
import {TracksImpl} from '../../models/tracks/tracks.model';

@Component({
  templateUrl: './add-track.dialog.component.html'
})
export class AddTrackDialogComponent implements OnInit {

  public track: Track;
  public tracks: Tracks;
  public playlist: Playlist;

  constructor(private dialogRef: MdDialogRef<AddTrackDialogComponent>,
              private trackService: TrackService) {
    this.track = new TrackImpl();
    this.setEmptyTracklists();
  }

  ngOnInit(): void {

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
    this.tracks = tracks;
  }

  private setEmptyTracklists(): void {
    this.tracks = new TracksImpl();
  }
}
