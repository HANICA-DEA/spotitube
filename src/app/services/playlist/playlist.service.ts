import {Injectable} from '@angular/core';
import {Playlists} from '../../models/playlists/playlists.interface.model';
import {RestfulSpotitubeClientService} from '../restful-spotitube-client/restful-spotitube-client.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LoggingService} from '../logging/logging.service';
import {LoginService} from '../login/login.service';
import {AppConstants} from '../../app.constants';

import 'rxjs/add/operator/toPromise';

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

  public async getPlaylists(): Promise<Playlists> {
    const response = await this.handlePlaylistsRequest();

    return response
  }

  private async handlePlaylistsRequest(): Promise<Playlists> {
    const endpointUrl = this.createEndpointUrl(AppConstants.API_PLAYLISTS);
    const params = this.createtokenParam();

    try {
      const data: Playlists = await this.httpClient.get<Playlists>(endpointUrl, {params: params}).toPromise();
      return data;
    } catch (err) {
      this.handleErrors(err)
    }
  }
}
