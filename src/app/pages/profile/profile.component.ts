import {Component, OnInit} from '@angular/core';
import {UsersCommentsComponent} from './components/users-comments/users-comments.component';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {CustomsnackbarComponent} from '../../components/customsnackbar/customsnackbar.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CapitalizeFirstPipe} from '../../pipes/capitalizefirstpipe.pipe';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    UsersCommentsComponent,
    MatButton,
    CapitalizeFirstPipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  userData: any
  isLoggedIn: boolean = false;

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if(userId) {
      this.auth.getUserById(userId).then((user) => {
        this.userData = user;
      });
    }
    this.auth.isLoggedIn().subscribe(user => {
      this.isLoggedIn = !!user;
    });
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
    this.auth.signOut();

    this.snackBar.openFromComponent(CustomsnackbarComponent, {
      data: { message: 'Kijelentkezve', actionLabel: 'Rendben' },
      duration: 3000,
      horizontalPosition: 'center',
    });
  }
}
