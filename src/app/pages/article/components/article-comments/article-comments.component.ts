import {Component, Input} from '@angular/core';
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
export class ArticleCommentsComponent {
  @Input() articleId!: number;

  loggedId : any

  constructor(private auth: AuthService) {
  }

  comments: (CommentModel & { userName: string, profileImage: any })[] = [];

  ngOnInit() {
    this.comments = comments_list
      .filter(c => c.articleId === this.articleId)
      .map(c => ({
        ...c,
        userName: users_list.find(u => u.id === c.userid)?.username || 'Ismeretlen felhasználó',
        profileImage: `/img/profile_pictures/${c.userid}.jpg`
      }));
    this.loggedId = this.auth.getLoggedId();
  }




}
