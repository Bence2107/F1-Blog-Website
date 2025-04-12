import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {comments_list} from '../../../../constants/comments_list';
import {CommentModel} from '../../../../models/comment_model';
import {users_list} from '../../../../constants/users';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../../../auth/auth_service';
import {MatFormField, MatInput} from '@angular/material/input';

@Component({
  selector: 'app-article-comments',
  imports: [
    NgForOf,
    NgIf,
    MatButton,
    MatFormField,
    MatInput
  ],
  templateUrl: './article-comments.component.html',
  styleUrl: './article-comments.component.scss'
})
export class ArticleCommentsComponent implements OnInit {
  @Input() articleUrl!: string;


  loggedId : any;
  userData: any;
  comments: (CommentModel & { userName: string, profileImage: any })[] = [];

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.comments = comments_list
      .filter(c => c.articleUrl === this.articleUrl)
      .map(c => {
        const user = users_list.find(u => u.id === c.userid);
        return {
          ...c,
          userName: user?.username || 'Ismeretlen felhasználó',
          profileImage: user?.avatarUrl ? `assets/img/profile_pictures/${c.userid}.jpg` : 'assets/img/profile_pictures/avatar.jpg'
        };
      }) || [];
    this.loggedId = this.auth.getLoggedId();
    if (this.loggedId) {
      this.userData = users_list.find(user => user.id === this.loggedId);
      if (!this.userData) {
        console.error('User not found!');
      }
    }
  }

  isLoggedIn() {
    return this.auth.getLoggedInStatus();
  }

  loadComments() : boolean{
    return this.comments.length !== 0;
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
