import 'hammerjs';
import {NgModule} from '@angular/core';
import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdSelectModule,
  MdSidenavModule,
  MdSlideToggleModule,
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
    MdToolbarModule
  ],
  exports: [
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdSnackBarModule,
    MdToolbarModule
  ]
})
export class SpotitubeMaterialModule {
}
