import 'hammerjs';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SpotitubeAngularModule} from './modules/angular.module';
import {SpotitubeMaterialModule} from './modules/material.module';
import {LoginComponent} from './components/login/login.component';
import {LoginService} from './services/login/login.service';
import {LoggingService} from './services/logging/logging.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    SpotitubeAngularModule,
    SpotitubeMaterialModule
  ],
  providers: [
    LoggingService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
