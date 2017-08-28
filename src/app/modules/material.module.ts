import 'hammerjs';
import {NgModule} from '@angular/core';
import {
  MdButtonModule,
  MdCardModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdSnackBarModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCardModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdSnackBarModule,
    MdToolbarModule,
    MdTooltipModule
  ],
  exports: [
    MdButtonModule,
    MdCardModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdSnackBarModule,
    MdToolbarModule,
    MdTooltipModule
  ]
})
export class SpotitubeMaterialModule {
}
