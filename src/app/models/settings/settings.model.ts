import {Settings} from './settings.interface.model';

export class SettingsImpl implements Settings {
  server: string;
  user: string;
  token: string;

  constructor() {
    this.server = '';
    this.user = '';
    this.token = '';
  }
}
