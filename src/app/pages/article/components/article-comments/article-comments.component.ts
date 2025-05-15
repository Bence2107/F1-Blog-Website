import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {comments_list} from '../../../../constants/comments_list';
import {CommentModel} from '../../../../models/comment_model';
import {users_list} from '../../../../constants/users';
import {MatButton} from '@angular/material/button';
import {FakeAuthService} from '../../../../services/auth/fake_auth_service';
import {MatFormField, MatInput} from '@angular/material/input';
import {AuthService} from '../../../../services/auth/auth.service';
import {UserService} from '../../../../services/user/user.service';
import {UserModel} from '../../../../models/user_model';
import {BehaviorSubject} from 'rxjs';

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
  comments: (CommentModel & {profileImage: any })[] = [];
  isLoggedIn = new BehaviorSubject<boolean>(true);

  constructor(private auth: AuthService, private usersService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.auth.isLoggedIn().subscribe(user => {
      this.isLoggedIn.next(!!user);
      if (user) {
        this.loadUserData(user.uid);
      } else {
        this.resetUserData();
      }

      this.cdr.detectChanges();
    });
    this.refreshComments();
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

  refreshComments(): void {
    this.comments = comments_list
      .filter(c => c.articleUrl === this.articleUrl)
      .map(c => {
        const user = users_list.find(u => u.id === c.userId);
        return {
          ...c,
          userName: user?.username || 'Ismeretlen felhasználó',
          profileImage: this.loadCommentAvatar(user)
        };
      }) || [];
  }

  loadAvatar(): string {
    if(this.userData && this.userData.avatarUrl) {
      return `assets/img/profile_pictures/${this.userData.id}.jpg`;
    }
    else{
      return `assets/img/profile_pictures/avatar.jpg`;
    }
  }

  loadCommentAvatar(user: UserModel | undefined): string {
    if(user != null && user.avatarUrl) {
      return `assets/img/profile_pictures/${user.id}.jpg`;
    }
    else{
      return `assets/img/profile_pictures/avatar.jpg`;
    }
}
}
