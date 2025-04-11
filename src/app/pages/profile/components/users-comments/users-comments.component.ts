import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../../../auth/auth_service';
import {CommentModel} from '../../../../models/comment_model';
import {comments_list} from '../../../../constants/comments_list';
import {users_list} from '../../../../constants/users';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-users-comments',
  imports: [
    NgForOf,
    NgIf,
    MatButton,
    RouterLink
  ],
  templateUrl: './users-comments.component.html',
  styleUrl: './users-comments.component.scss'
})
export class UsersCommentsComponent implements OnInit {
  @Input() loggedId!: any;
  comments: (CommentModel & { userName: string, profileImage: any })[] = [];

  ngOnInit() {
    this.comments = comments_list
      .filter(c => c.userid === this.loggedId)
      .map(c => {
        const user = users_list.find(u => u.id === c.userid);
        return {
          ...c,
          userName: user?.username || 'Ismeretlen felhasználó',
          profileImage: user?.avatarUrl ? `assets/img/profile_pictures/${c.userid}.jpg` : 'assets/img/profile_pictures/avatar.jpg'
        };
      });
  }
}
