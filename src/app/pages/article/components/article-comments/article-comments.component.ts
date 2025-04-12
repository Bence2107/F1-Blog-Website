import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {comments_list} from '../../../../constants/comments_list';
import {CommentModel} from '../../../../models/comment_model';
import {users_list} from '../../../../constants/users';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../../../auth/auth_service';

@Component({
  selector: 'app-article-comments',
  imports: [
    NgForOf,
    NgIf,
    MatButton
  ],
  templateUrl: './article-comments.component.html',
  styleUrl: './article-comments.component.scss'
})
export class ArticleCommentsComponent implements OnInit {
  @Input() articleUrl!: string;

  loggedId : any

  constructor(private auth: AuthService) {}

  comments: (CommentModel & { userName: string, profileImage: any })[] = [];

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
  }

  loadComments() : boolean{
    return this.comments.length !== 0;
  }

}
