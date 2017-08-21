import 'hammerjs';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SpotitubeAngularModule} from './modules/angular.module';
import {SpotitubeMaterialModule} from './modules/material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SpotitubeAngularModule,
    SpotitubeMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
