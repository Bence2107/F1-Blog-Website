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

  constructor(private auth: AuthService, private usersService: UserService,private commentService: CommentService, private cdr: ChangeDetectorRef) {}

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

  loadComments() : boolean{
    return this.comments.length !== 0;
  }

  async refreshComments(): Promise<void> {
    if (!this.loggedId) return;

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

  async deleteComment(comment: CommentModel) {
    try {
      await this.commentService.deleteComment(comment);
      await this.refreshComments();
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  }

  loadAvatar(): string {
    if(this.userData && this.userData.avatarUrl) {
      return `assets/img/profile_pictures/${this.loggedId}.jpg`;
    }
    else{
      return `assets/img/profile_pictures/avatar.jpg`;
    }
  }
}
