import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimaryNewsListComponent} from './components/primary-news-list/primary-news-list.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    PrimaryNewsListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
