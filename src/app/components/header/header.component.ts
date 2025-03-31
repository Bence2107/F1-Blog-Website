import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    MatButton,
    MatSidenavContainer,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenav,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isScreenSmall: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(['(max-width: 870px)']).subscribe(result => {
      this.isScreenSmall = result.matches;
    });
  }

}
