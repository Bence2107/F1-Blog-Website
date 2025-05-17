import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UsersCommentsComponent} from './components/users-comments/users-comments.component';
import {MatButton} from '@angular/material/button';
import {CustomsnackbarComponent} from '../../components/customsnackbar/customsnackbar.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CapitalizeFirstPipe} from '../../pipes/capitalizefirstpipe.pipe';
import {AuthService} from '../../services/auth/auth.service';
import {UserService} from '../../services/user/user.service';
import {UserModel} from '../../models/user_model';
import {BehaviorSubject} from 'rxjs';
import {AsyncPipe, NgIf} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    UsersCommentsComponent,
    MatButton,
    CapitalizeFirstPipe,
    AsyncPipe,
    NgIf,
    MatProgressBar
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  userData: UserModel | null = null
  isLoggedIn: boolean = false;
  loggedId: any;
  avatarUrl = new BehaviorSubject(<string>"");

  constructor(private auth: AuthService, private userService: UserService,private cdr: ChangeDetectorRef, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if(userId) {
      this.userService.getUserById(userId).then((user) => {
        this.userData = user;
        this.loggedId = this.userData?.id;
        this.loadAvatar();
        this.cdr.detectChanges();
      });
    }

    this.auth.isLoggedIn().subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  loadAvatar(): void {
    if(this.userData && this.userData.avatarUrl) {
      this.avatarUrl.next(`assets/img/profile_pictures/${this.loggedId}.jpg`);
    }
    else{
      this.avatarUrl.next(`assets/img/profile_pictures/avatar.jpg`);
    }
  }



  logout() {
    this.auth.signOut();
    this.auth.updateLogInStatus(false);
    this.snackBar.openFromComponent(CustomsnackbarComponent, {
      data: { message: 'Kijelentkezve', actionLabel: 'Rendben' },
      duration: 3000,
      horizontalPosition: 'center',
    });
  }
}
