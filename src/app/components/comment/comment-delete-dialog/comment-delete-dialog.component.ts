import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-comment-delete-dialog',
  templateUrl: './comment-delete-dialog.component.html',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatButton,
    MatDialogTitle
  ],
  styleUrls: ['./comment-delete-dialog.component.scss']
})
export class CommentDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CommentDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { commentId: string }
  ) {}

  confirmDelete(): void {
    this.dialogRef.close(true);
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
