import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentEditDialogComponent } from './comment-edit-dialog.component';

describe('CommentEditDialogComponent', () => {
  let component: CommentEditDialogComponent;
  let fixture: ComponentFixture<CommentEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
