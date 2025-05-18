import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions
} from '@angular/material/dialog';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-comment-edit-dialog',
  templateUrl: './comment-edit-dialog.component.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatDialogActions,
    FormsModule,
    MatButton,
    MatInput,
    ReactiveFormsModule
  ],
  styleUrls: ['./comment-edit-dialog.component.scss']
})
export class CommentEditDialogComponent {
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CommentEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { comment: string },
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      comment: [data.comment]
    });
  }

  save(): void {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value.comment);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
