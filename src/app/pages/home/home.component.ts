import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimaryNewsListComponent} from './components/primary-news-list/primary-news-list.component';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    PrimaryNewsListComponent,
    MatButton,
    RouterLink,
    MatTooltip,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
