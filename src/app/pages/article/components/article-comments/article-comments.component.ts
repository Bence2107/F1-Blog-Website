import {Component, Input, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput} from '@angular/material/input';
import {AuthService} from '../../../../services/auth/auth.service';
import {UserService} from '../../../../services/user/user.service';
import {BehaviorSubject} from 'rxjs';
import {CommentService} from '../../../../services/comments/comment.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommentModel} from '../../../../models/comment_model';
import {CustomsnackbarComponent} from '../../../../components/customsnackbar/customsnackbar.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DateFormatPipe} from '../../../../pipes/date-format.pipe';
import {CommentEditDialogComponent} from '../../../../components/comment/comment-edit-dialog/comment-edit-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {
  CommentDeleteDialogComponent
} from '../../../../components/comment/comment-delete-dialog/comment-delete-dialog.component';

@Component({
  selector: 'app-article-comments',
  imports: [
    NgForOf,
    NgIf,
    MatButton,
    MatFormField,
    MatInput,
    AsyncPipe,
    ReactiveFormsModule,
    FormsModule,
    DateFormatPipe,
  ],
  templateUrl: './article-comments.component.html',
  styleUrl: './article-comments.component.scss'
})
export class ArticleCommentsComponent implements OnInit {
  @Input() articleUrl!: string;
  userData: any;
  comments: any[] = [];
  isLoggedIn = new BehaviorSubject<boolean>(false);
  newCommentForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private usersService: UserService, private commentService: CommentService, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.newCommentForm = this.fb.group({
      comment_input: ['']
    });
  }

  async ngOnInit() {
    this.commentService.getComments().subscribe(comments => {
      this.comments = comments;
      this.refreshComments();
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
      }
    });
  }

  private resetUserData(): void {
    this.userData = null;
  }

  loadComments() : boolean{
    return this.comments.length !== 0;
  }

  async refreshComments(): Promise<void> {
    if(!this.comments) return;

    this.comments = await Promise.all(
      this.comments
      .filter(c => c.articleUrl === this.articleUrl)
      .map(async c =>{
            const user = await this.usersService.getUserById(c.userId);
            return {
              ...c,
              profileImage: user?.avatarUrl ? `assets/img/profile_pictures/${user.id}.jpg` : 'assets/img/profile_pictures/avatar.jpg'
            }
        }
      )
    );
  }

  async submitComment(){
    const comment = this.newCommentForm.get('comment_input')?.value
    if(!comment){
      this.snackBar.openFromComponent(CustomsnackbarComponent, {
        data: { message: 'Töltsd ki a kommentmezőt!', actionLabel: 'Rendben' },
        duration: 3000,
        horizontalPosition: 'center',
      });
      return;
    }


    const newComment = {
      articleUrl: this.articleUrl,
      content: comment,
      userId: this.userData?.id || '',
      username: this.userData?.username || 'Ismeretlen Felhasználó',
      timestamp: new Date().toISOString(),
    };

    try {
      await this.commentService.addComment(newComment);
      this.newCommentForm.reset();
      await this.refreshComments();
    } catch (error) {
      console.error('Hiba a komment létrehozásakor', error);
    }
  }
  loadAvatar(): string {
    if(this.userData && this.userData.avatarUrl) {
      return `assets/img/profile_pictures/${this.userData.id}.jpg`;
    }
    else{
      return `assets/img/profile_pictures/avatar.jpg`;
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
      console.error('Hiba történt a komment törlésekor:', error);
    }
  }

  navigateToLogin() {
    window.location.href = '/login';
  }

}
