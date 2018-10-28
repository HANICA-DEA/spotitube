import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  templateUrl: './new-playlist.dialog.component.html'
})
export class NewPlaylistDialogComponent {

  public name: string;

  constructor(private dialogRef: MatDialogRef<NewPlaylistDialogComponent>) {
  }

  public onOk(): void {
    this.dialogRef.close(this.name);
  }
}
