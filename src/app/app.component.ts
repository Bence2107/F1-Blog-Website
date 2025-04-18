import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {AuthService} from './pages/auth/auth_service';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MatSidenavModule,
    MatSidenavContainer,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    FooterComponent,
    MatToolbarModule,
    MatIconModule,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent implements OnInit {
  title: string = "F1-Blog-Website";

  loggedId : number | null = null;

  constructor(private authService: AuthService) {
    this.loggedId = this.authService.getLoggedId();
  }

  isloggedin(){
    return this.authService.getLoggedInStatus();
  }

  ngOnInit(){
    this.authService.loggedId$.subscribe(id => {
      this.loggedId = id;
    });
  }
}
