import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput} from '@angular/material/input';
import {AuthService} from '../../../../services/auth/auth.service';
import {UserService} from '../../../../services/user/user.service';
import {BehaviorSubject} from 'rxjs';
import {CommentService} from '../../../../services/comments/comment.service';

@Component({
  selector: 'app-article-comments',
  imports: [
    NgForOf,
    NgIf,
    MatButton,
    MatFormField,
    MatInput,
    AsyncPipe
  ],
  templateUrl: './article-comments.component.html',
  styleUrl: './article-comments.component.scss'
})
export class ArticleCommentsComponent implements OnInit {
  @Input() articleUrl!: string;
  userData: any;
  comments: any[] = [];
  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private auth: AuthService, private usersService: UserService, private commentService: CommentService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
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

  loadAvatar(): string {
    if(this.userData && this.userData.avatarUrl) {
      return `assets/img/profile_pictures/${this.userData.id}.jpg`;
    }
    else{
      return `assets/img/profile_pictures/avatar.jpg`;
    }
  }
}
