import {Injectable} from '@angular/core';
import {Playlists} from '../../models/playlists/playlists.interface.model';
import {RestfulSpotitubeClientService} from '../restful-spotitube-client/restful-spotitube-client.service';
import {HttpClient} from '@angular/common/http';
import {LoggingService} from '../logging/logging.service';
import {LoginService} from '../login/login.service';

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

  private handlePlaylistsRequest(): Promise<Playlists> {
    const apiCall = this.createRequestBody();

    // this.httpClient.post<Playlists>(
    //   this.retrieveServerUrl() + AppConstants.API_LOGIN,
    //   JSON.stringify(loginRequest),
    //   {headers: this.headers})
    //   .subscribe(data => this.handleLoginResponse(data), err => this.handleLoginErrors(err));


    const playlist1 = {
      name: 'Death metal',
      tracks: []
    };
    const playlist2 = {
      name: 'Singer/Songwriters from Ireland',
      tracks: []
    };
    const playlists = {
      playlists: [],
      length: 371234
    }

    playlists.playlists.push(playlist1);
    playlists.playlists.push(playlist2);

    return Promise.resolve(playlists);
  }
}
