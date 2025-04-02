import {Component, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgIf } from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';


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
export class HeaderComponent {
  isDarkMode: boolean = true;

  @Output() toggleSidenav = new EventEmitter<void>();
  isScreenSmall: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(['(max-width: 990px)']).subscribe(result => {
      this.isScreenSmall = result.matches;
    });
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
