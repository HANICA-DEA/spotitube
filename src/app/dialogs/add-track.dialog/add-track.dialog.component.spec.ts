/* tslint:disable:no-unused-variable */
import {async, TestBed} from '@angular/core/testing';
import {AddTrackDialogComponent} from './add-track.dialog.component';
import {MdDialog} from '@angular/material';
import {NgModule} from '@angular/core';
import {SpotitubeMaterialModule} from '../../modules/material.module';
import {SpotitubeAngularModule} from '../../modules/angular.module';
import {TrackService} from '../../services/track/track.service';
import {LoggingService} from '../../services/logging/logging.service';
import {MinutesPipe} from '../../pipes/minutes.pipe';

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
        AddTrackDialogComponent,
        MinutesPipe
      ],
      imports: [
        SpotitubeAngularModule,
        SpotitubeMaterialModule,
        TestModule
      ],
      providers: [
        LoggingService,
        TrackService
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
