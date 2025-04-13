import {Component, OnInit} from '@angular/core';
import {UsersCommentsComponent} from './components/users-comments/users-comments.component';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../auth/auth_service';
import {UserModel} from '../../models/user_model';

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
  userData: UserModel | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.getLoggedInUser().subscribe(user => {
      this.userData = user;
    });
    if (!this.userData || !this.auth.getLoggedInStatus()) {
      this.router.navigate(["/login"]);
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

  logout() {
    this.auth.logout();
  }
}
