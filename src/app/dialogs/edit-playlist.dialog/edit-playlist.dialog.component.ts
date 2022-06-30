import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  templateUrl: './edit-playlist.dialog.component.html'
})
export class EditPlaylistDialogComponent {

  public name: string;

  constructor(private dialogRef: MatDialogRef<EditPlaylistDialogComponent>) {
  }

  public onOk(): void {
    this.dialogRef.close(this.name);
  }
}
