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
  MdSnackBarModule,
  MdTableModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdSnackBarModule,
    MdTableModule,
    MdToolbarModule,
    MdTooltipModule
  ],
  exports: [
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdSnackBarModule,
    MdTableModule,
    MdToolbarModule,
    MdTooltipModule
  ]
})
export class SpotitubeMaterialModule {
}
