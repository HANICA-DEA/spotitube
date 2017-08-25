import 'hammerjs';
import {NgModule} from '@angular/core';
import {
  MdButtonModule,
  MdCardModule,
  MdIconModule,
  MdInputModule,
  MdSnackBarModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdSnackBarModule,
    MdToolbarModule,
    MdTooltipModule
  ],
  exports: [
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdSnackBarModule,
    MdToolbarModule,
    MdTooltipModule
  ]
})
export class SpotitubeMaterialModule {
}
