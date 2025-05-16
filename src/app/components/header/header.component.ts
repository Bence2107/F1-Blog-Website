import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {AsyncPipe, NgIf} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {AuthService} from '../../services/auth/auth.service';
import {UserService} from '../../services/user/user.service';
import {UserModel} from '../../models/user_model';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [
    NgIf,
    MatButton,
    RouterLink,
    MatIconButton,
    MatIcon,
    RouterLinkActive,
    MatTooltip,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isDarkMode: boolean = true;
  loggedId: any;
  userData: UserModel | null = null;
  avatarUrl = new BehaviorSubject<string | null>(null);
  isLoggedIn: boolean = false;

  @Output() toggleSidenav = new EventEmitter<void>();
  isScreenSmall: boolean = false;

  constructor(private auth: AuthService, private usersService: UserService, private breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef) {
    this.breakpointObserver.observe(['(max-width: 990px)']).subscribe(result => {
      this.isScreenSmall = result.matches;
    });
  }

  ngOnInit(): void {
    this.initializeTheme();
    this.isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn") || "false");
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.loadUserData(userId);
    }

    this.auth.isLoggedIn().subscribe(user => {
      this.isLoggedIn = !!user;
      if (user) {
        this.loadUserData(user.uid);
      } else {
        this.resetUserData();
      }
    });
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.isDarkMode = savedTheme === 'dark';
    this.setTheme(savedTheme);
  }
  private loadUserData(userId: string): void {
    this.usersService.getUserById(userId).then((user) => {
      if (user) {
        this.userData = user;
        this.loggedId = this.userData.id;
        this.loadAvatar();
        this.cdr.detectChanges();
      } else {
        this.resetUserData();
      }
    }).catch(() => {
      this.resetUserData();
    });
  }

  private resetUserData(): void {
    this.userData = null;
    this.loggedId = null;
    this.avatarUrl.next(`assets/img/profile_pictures/avatar.jpg`);
  }

  loadAvatar(): void {
    if(this.userData && this.userData.avatarUrl) {
      this.avatarUrl.next(`assets/img/profile_pictures/${this.loggedId}.jpg`);
    }
    else{
      this.avatarUrl.next(`assets/img/profile_pictures/avatar.jpg`);
    }
    this.cdr.detectChanges();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const newTheme = this.isDarkMode ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme: string) {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', theme);
  }
}
