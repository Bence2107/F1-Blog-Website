import {Component} from '@angular/core';
import {news_list} from '../../../../constants/news';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-news-list',
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
})
export class NewsListComponent {

  protected readonly news_list = news_list;
}
