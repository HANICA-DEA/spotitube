/* tslint:disable:no-unused-variable */
import {async, TestBed} from '@angular/core/testing';
import {EditPlaylistDialogComponent} from './edit-playlist.dialog.component';
import {MdDialog} from '@angular/material';
import {NgModule} from '@angular/core';
import {SpotitubeMaterialModule} from '../../modules/material.module';
import {SpotitubeAngularModule} from '../../modules/angular.module';

@NgModule({
  entryComponents: [
    EditPlaylistDialogComponent
  ],
})
export class TestModule {
}

describe('EditPlaylistDialogComponent', () => {
  let component: EditPlaylistDialogComponent;
  let dialog: MdDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditPlaylistDialogComponent
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
    dialog = TestBed.get(MdDialog);
    const dialogRef = dialog.open(EditPlaylistDialogComponent);
    component = dialogRef.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
