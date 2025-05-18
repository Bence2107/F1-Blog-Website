import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../../../services/auth/auth.service';
import {CommentService} from '../../../../services/comments/comment.service';
import {UserService} from '../../../../services/user/user.service';
import {BehaviorSubject} from 'rxjs';
import {CommentModel} from '../../../../models/comment_model';
import {DateFormatPipe} from '../../../../pipes/date-format.pipe';
import {CommentEditDialogComponent} from '../../../../components/comment/comment-edit-dialog/comment-edit-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {
  CommentDeleteDialogComponent
} from '../../../../components/comment/comment-delete-dialog/comment-delete-dialog.component';

@Component({
  selector: 'app-users-comments',
  imports: [
    NgForOf,
    NgIf,
    MatButton,
    RouterLink,
    DateFormatPipe
  ],
  templateUrl: './users-comments.component.html',
  styleUrl: './users-comments.component.scss'
})
export class UsersCommentsComponent implements OnInit {
  @Input() loggedId!: any;
  userData: any
  comments : any[] = []
  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private auth: AuthService, private usersService: UserService, private commentService: CommentService, private cdr: ChangeDetectorRef, private dialog: MatDialog) {}

  ngOnInit() {
    this.loggedId = localStorage.getItem('userId');
    this.commentService.getComments().subscribe(comments => {
      this.comments = comments;
      this.refreshComments();
      this.cdr.detectChanges();

      this.auth.isLoggedIn().subscribe(user => {
        this.isLoggedIn.next(!!user);
        if (user) {
          this.loadUserData(user.uid);
        } else {
          this.resetUserData();
        }
      });
    });
  }

  private loadUserData(userId: string): void {
    this.usersService.getUserById(userId).then((user) => {
      if (user) {
        this.userData = user;
        this.loadAvatar();
        this.cdr.markForCheck();
      }
    });
  }

  private resetUserData(): void {
    this.userData = null;
  }

  loadAvatar(): string {
    if(this.userData && this.userData.avatarUrl) {
      return `assets/img/profile_pictures/${this.loggedId}.jpg`;
    }
    else{
      return `assets/img/profile_pictures/avatar.jpg`;
    }
  }

  loadComments() : boolean{
    return this.comments.length !== 0;
  }

  async refreshComments(): Promise<void> {
    if (!this.comments) return;

    try {
      this.comments = await this.commentService.getUsersComments(this.loggedId);

      this.comments = this.comments.map(comment => ({
        ...comment,
        profileImage: comment.profileImage
          ? comment.profileImage
          : 'assets/img/profile_pictures/avatar.jpg'
      }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }

  async openUpdateCommentDialog(comment: CommentModel): Promise<void> {
    const dialogRef = this.dialog.open(CommentEditDialogComponent, {
      width: '800px',
      data: { comment: comment.content }
    });

    dialogRef.afterClosed().subscribe(updatedComment => {
      if (updatedComment !== undefined) {
        comment.content = updatedComment;
        this.commentService.updateComment(comment.id, updatedComment);
      }
    });
  }

  async openDeleteCommentDialog(comment: CommentModel): Promise<void> {
    try {
      const dialogRef = this.dialog.open(CommentDeleteDialogComponent, {
        width: '400px',
        data: { commentId: comment.id }
      });

      dialogRef.afterClosed().subscribe(async (result) => {
        if (result) {
          await this.commentService.deleteComment(comment);
          await this.refreshComments();
        }
      });
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  }
}
