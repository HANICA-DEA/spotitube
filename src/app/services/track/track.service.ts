import {Injectable} from '@angular/core';
import {RestfulSpotitubeClientService} from '../restful-spotitube-client/restful-spotitube-client.service';
import {HttpClient} from '@angular/common/http';
import {LoggingService} from '../logging/logging.service';

import 'rxjs/add/operator/toPromise';
import {Track} from '../../models/track/track.interface';
import {AppConstants} from '../../app.constants';
import {Playlist} from '../../models/playlist/playlist.interface.model';
import {Tracks} from '../../models/tracks/tracks.interface.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class TrackService extends RestfulSpotitubeClientService {

  private tracksUpdated = new Subject<Tracks>();

  /**
   * Register to this observable to be notified when the tracks have changed.
   *
   * @type {Observable<Tracks>}
   */
  public tracksUpdated$ = this.tracksUpdated.asObservable();

  /**
   * Create a new TrackService
   *
   * @param {HttpClient} httpClient
   * @param {LoggingService} loggingService
   */
  constructor(private httpClient: HttpClient,
              loggingService: LoggingService) {

    super(loggingService);
  }

  /**
   * Add a Track to a Playlist
   *
   * @param {Playlist} playlist
   * @param {Track} track
   * @return {Promise<Playlists>} The complete and updated list of playlists
   */
  public async addTrackToPlaylist(playlist: Playlist, track: Track): Promise<Tracks> {
    const endpointUrl = this.getTracksEndpoint(playlist);
    const params = this.createtokenParam();

    try {
      const data: Tracks = await this.httpClient.post<Tracks>(endpointUrl,
        JSON.stringify(track),
        {
          headers: this.headers,
          params: params
        }
      ).toPromise();
      this.tracksUpdated.next();
      return data;
    } catch (err) {
      this.handleErrors(err)
      return Promise.reject(err);
    }
  }

  /**
   * Remove a track from the playlist.
   *
   * @param {Playlist} playlist
   * @param {Track} track
   * @return {Promise<Track[]>} The complete and updated list of tracks belonging to the given playlist
   */
  public async removeTracksFromPlaylist(playlist: Playlist, track: Track): Promise<Tracks> {
    const endpointUrl = this.getTrackEndpoint(playlist, track);
    const params = this.createtokenParam();

    try {
      const data: Tracks = await this.httpClient.delete<Tracks>(endpointUrl, {params: params}).toPromise();
      this.tracksUpdated.next();
      return data;
    } catch (err) {
      this.handleErrors(err)
      return Promise.reject(err);
    }
  }

  /**
   * Return all Tracks
   *
   * @return {Promise<Track[]>} An array of Tracks.
   */
  public async getAllTracks(playlist?: Playlist): Promise<Tracks> {
    let params = this.createtokenParam();

    if (playlist) {
      params = params.append('forPlaylist', playlist.id.toString());
    }

    try {
      const data: Tracks = await this.httpClient.get<Tracks>(this.createEndpointUrl(AppConstants.API_TRACKS),
        {params: params}).toPromise();
      return data;
    } catch (err) {
      this.handleErrors(err)
      return Promise.reject(err);
    }
  }

  /**
   * Return all Tracks for the given playlist.
   *
   * @return {Promise<Track[]>} An array of Tracks.
   */
  public async getTracksForPlaylist(playlist: Playlist): Promise<Tracks> {
    const endpointUrl = this.getTracksEndpoint(playlist);
    const params = this.createtokenParam();

    try {
      const data: Tracks = await this.httpClient.get<Tracks>(endpointUrl, {params: params}).toPromise();
      return data;
    } catch (err) {
      this.handleErrors(err)
      return Promise.reject(err);
    }
  }


  private getTrackEndpoint(playlist: Playlist, track: Track): string {
    const trackEndpoints = this.getTracksEndpoint(playlist)
      .concat('/' + track.id);

    return trackEndpoints;
  }

  private getTracksEndpoint(playlist: Playlist): string {
    const baseEndpointUrl = this.createEndpointUrl(AppConstants.API_PLAYLISTS);

    const tracksEndpoints = ((baseEndpointUrl.concat('/'))
      .concat(playlist.id.toString()))
      .concat(AppConstants.API_TRACKS);

    return tracksEndpoints;
  }
}
