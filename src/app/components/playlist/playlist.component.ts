import {Component, OnInit} from '@angular/core';
import {Playlist} from '../../models/playlist/playlist.interface.model';
import {TrackService} from '../../services/track/track.service';
import {Tracks} from '../../models/tracks/tracks.interface.model';
import {TracksImpl} from '../../models/tracks/tracks.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  public playlist: Playlist;
  public tracks: Tracks;

  constructor(private trackService: TrackService) {
    this.setEmptyTracklists();
  }

  ngOnInit() {

  }

  public onAddTrack(): void {
    console.log('A new track shall be added.');
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
