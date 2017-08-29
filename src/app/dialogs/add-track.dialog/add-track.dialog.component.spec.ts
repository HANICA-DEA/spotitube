/* tslint:disable:no-unused-variable */
import {async, TestBed} from '@angular/core/testing';
import {AddTrackDialogComponent} from './add-track.dialog.component';
import {MdDialog} from '@angular/material';
import {NgModule} from '@angular/core';
import {SpotitubeMaterialModule} from '../../modules/material.module';
import {SpotitubeAngularModule} from '../../modules/angular.module';

@NgModule({
  entryComponents: [
    AddTrackDialogComponent
  ],
})
export class TestModule {
}

describe('AddTrackDialogComponent', () => {
  let component: AddTrackDialogComponent;
  let dialog: MdDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddTrackDialogComponent
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
    const dialogRef = dialog.open(AddTrackDialogComponent);
    component = dialogRef.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
