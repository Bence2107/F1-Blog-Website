import {Component, OnInit} from '@angular/core';
import {UsersCommentsComponent} from './components/users-comments/users-comments.component';
import {ActivatedRoute, Router} from '@angular/router';
import {users_list} from '../../constants/users';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../auth/auth_service';

@Component({
  selector: 'app-profile',
  imports: [
    UsersCommentsComponent,
    MatButton
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  userId: number | null = null;
  userData: any;

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.userData = users_list.find(user => user.id === this.userId);
      if (!this.userData) {
        this.router.navigate(["/login"]);
      }
    }
    if (!this.auth.getLoggedInStatus()){
      this.router.navigate(["/login"]);
    }
  }

  loadAvatar(): string {
    if(this.userData && this.userData.avatarUrl) {
      return `assets/img/profile_pictures/${this.userId}.jpg`;
    }
    else{
      return `assets/img/profile_pictures/avatar.jpg`;
    }
  }

  logout() {
    this.auth.logout();
  }
}
