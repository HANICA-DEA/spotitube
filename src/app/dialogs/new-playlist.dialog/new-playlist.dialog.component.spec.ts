/* tslint:disable:no-unused-variable */
import {async, TestBed} from '@angular/core/testing';
import {NewPlaylistDialogComponent} from './new-playlist.dialog.component';
import {MatDialog} from '@angular/material';
import {NgModule} from '@angular/core';
import {SpotitubeMaterialModule} from '../../modules/material.module';
import {SpotitubeAngularModule} from '../../modules/angular.module';

@NgModule({
  entryComponents: [
    NewPlaylistDialogComponent
  ],
})
export class TestModule {
}

describe('NewPlaylistDialogComponent', () => {
  let component: NewPlaylistDialogComponent;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewPlaylistDialogComponent
      ],
      imports: [
        SpotitubeAngularModule,
        SpotitubeMaterialModule,
        TestModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    const dialogRef = dialog.open(NewPlaylistDialogComponent);
    component = dialogRef.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
