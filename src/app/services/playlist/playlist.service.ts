import {Injectable} from '@angular/core';
import {Playlists} from '../../models/playlists/playlists.interface.model';
import {RestfulSpotitubeClientService} from '../restful-spotitube-client/restful-spotitube-client.service';
import {HttpClient} from '@angular/common/http';
import {LoggingService} from '../logging/logging.service';
import {LoginService} from '../login/login.service';
import {AppConstants} from '../../app.constants';

import 'rxjs/add/operator/toPromise';
import {Playlist} from '../../models/playlist/playlist.interface.model';

@Injectable()
export class PlaylistService extends RestfulSpotitubeClientService {

  /**
   * Create a new PlaylistService
   *
   * @param {HttpClient} httpClient
   * @param {LoginService} loginService
   * @param {LoggingService} loggingService
   */
  constructor(private httpClient: HttpClient,
              loggingService: LoggingService) {

    super(loggingService);
  }

  /**
   * Return a complete list of playlists.
   *
   * @return {Promise<Playlists>} The complete list of playlists
   */
  public async getPlaylists(): Promise<Playlists> {
    const endpointUrl = this.createEndpointUrl(AppConstants.API_PLAYLISTS);
    const params = this.createtokenParam();

    try {
      const data: Playlists = await this.httpClient.get<Playlists>(endpointUrl, {params: params}).toPromise();
      return data;
    } catch (err) {
      this.handleErrors(err)
      return Promise.reject(err);
    }
  }

  /**
   * Create a new Playlist.
   *
   * @param {Playlist} playlist
   * @return {Promise<Playlists>} The complete and updated list of playlists
   */
  public async newPlaylist(playlist: Playlist): Promise<Playlists> {
    const endpointUrl = this.getPlaylistEndpoint(undefined);
    const params = this.createtokenParam();

    try {
      const data: Playlists = await this.httpClient.put<Playlists>(endpointUrl,
        JSON.stringify(playlist),
        {
          headers: this.headers,
          params: params
        }
      ).toPromise();
      return data;
    } catch (err) {
      this.handleErrors(err)
      return Promise.reject(err);
    }
  }

  /**
   * Update the given playlist.
   *
   * @param {Playlist} playlist
   * @return {Promise<Playlists>} The complete and updated list of playlists
   */
  public async updatePlaylist(playlist: Playlist): Promise<Playlists> {
    const endpointUrl = this.getPlaylistEndpoint(playlist);
    const params = this.createtokenParam();

    try {
      const data: Playlists = await this.httpClient.post<Playlists>(endpointUrl,
        JSON.stringify(playlist),
        {
          headers: this.headers,
          params: params
        }
      ).toPromise();
      return data;
    } catch (err) {
      this.handleErrors(err)
      return Promise.reject(err);
    }
  }

  /**
   * Delete the given playlist
   *
   * @param {Playlist} playlist
   * @return {Promise<Playlists>} The complete and updated list of playlists
   */
  public async deletePlaylist(playlist: Playlist): Promise<Playlists> {
    const endpointUrl = this.getPlaylistEndpoint(playlist);
    const params = this.createtokenParam();

    try {
      const data: Playlists = await this.httpClient.delete<Playlists>(endpointUrl,
        {params: params}).toPromise();
      return data;
    } catch (err) {
      this.handleErrors(err)
      return Promise.reject(err);
    }
  }

  private getPlaylistEndpoint(playlist: Playlist): string {
    const baseEndpointUrl = this.createEndpointUrl(AppConstants.API_PLAYLISTS);

    if (playlist) {
      return (baseEndpointUrl.concat('/')).concat(playlist.id.toString());
    } else {
      return baseEndpointUrl;
    }
  }
}
