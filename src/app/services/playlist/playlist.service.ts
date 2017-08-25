import {Injectable} from '@angular/core';
import {Playlists} from '../../models/playlists/playlists.interface.model';
import {RestfulSpotitubeClientService} from '../restful-spotitube-client/restful-spotitube-client.service';
import {HttpClient} from '@angular/common/http';
import {LoggingService} from '../logging/logging.service';
import {ApiCall} from '../../models/api-call/api-call.model';
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
              private loginService: LoginService,
              loggingService: LoggingService) {

    super(loggingService);

  }

  public async getPlaylists(): Promise<Playlists> {

    const settings = await this.loginService.getSettings();
    const response = await this.handlePlaylistsRequest(settings.token);

    return response
  }

  private handlePlaylistsRequest(token: string): Promise<Playlists> {
    const apiCall = new ApiCall(token);

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
