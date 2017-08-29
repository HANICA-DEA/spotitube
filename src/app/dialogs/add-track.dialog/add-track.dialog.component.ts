import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {Track} from '../../models/track/track.interface';
import {TrackImpl} from '../../models/track/track.model';

@Component({
  templateUrl: './add-track.dialog.component.html'
})
export class AddTrackDialogComponent {

  public track: Track;

  constructor(private dialogRef: MdDialogRef<AddTrackDialogComponent>) {
    this.track = new TrackImpl();
  }

  public onOk(): void {
    this.dialogRef.close(this.track);
  }
}
