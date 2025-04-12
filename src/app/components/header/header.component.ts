import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgIf } from '@angular/common';
import  {MatButton, MatIconButton } from '@angular/material/button';
import { RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {AuthService} from '../../pages/auth/auth_service';
import {users_list} from '../../constants/users';

@Component({
  selector: 'app-header',
  imports: [
    NgIf,
    MatButton,
    RouterLink,
    MatIconButton,
    MatIcon,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isDarkMode: boolean = true;
  loggedId: number | null = null;
  userData: any;

  @Output() toggleSidenav = new EventEmitter<void>();
  isScreenSmall: boolean = false;

  constructor(private auth: AuthService,private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(['(max-width: 990px)']).subscribe(result => {
      this.isScreenSmall = result.matches;
    });
  }

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.isDarkMode = savedTheme === 'dark';
    this.setTheme(savedTheme);
    this.auth.loggedId$.subscribe(id => {
      this.loggedId = id;
      if (this.loggedId) {
        this.userData = users_list.find(user => user.id === this.loggedId);
        if (!this.userData) {
          console.error('User not found!');
        }
      }
    });

  }

  loadAvatar(): string {
    if(this.userData && this.userData.avatarUrl) {
      return `assets/img/profile_pictures/${this.loggedId}.jpg`;
    }
    else{
      return `assets/img/profile_pictures/avatar.jpg`;
    }
  }

  isLogged(): boolean {
    return this.auth.getLoggedInStatus();
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
