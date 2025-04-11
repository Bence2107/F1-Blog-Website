import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgIf } from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {AuthService} from '../../pages/auth/auth_service';

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
  loggedId : any;

  constructor(private auth: AuthService,private breakpointObserver: BreakpointObserver, private router: Router) {
    this.breakpointObserver.observe(['(max-width: 990px)']).subscribe(result => {
      this.isScreenSmall = result.matches;
    });
  }

  isLogged(): boolean {
    return this.auth.getLoggedInStatus();
  }

  login(userid: number): void {
    this.auth.setLoggedInStatus(true, userid);
    this.loggedId = this.auth.getLoggedId();
  }

  logout(): void {
    this.auth.setLoggedInStatus(false, null);
    this.router.navigate(['/home']);
  }

  isDarkMode: boolean = true;

  @Output() toggleSidenav = new EventEmitter<void>();
  isScreenSmall: boolean = false;

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.isDarkMode = savedTheme === 'dark';
    this.setTheme(savedTheme);

    this.login(1);
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '/img/profile_pictures/avatar.jpg';
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
