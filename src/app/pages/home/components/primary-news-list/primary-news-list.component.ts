import {Component, Input} from '@angular/core';
import {NgForOf} from '@angular/common';
import {NewsModel} from '../../../../models/news_model';
import {news_list} from '../../../../constants/news';

@Component({
  selector: 'app-primary-news-list',
  imports: [
    NgForOf,
  ],
  templateUrl: './primary-news-list.component.html',
  styleUrl: './primary-news-list.component.scss'
})
export class PrimaryNewsListComponent {
  @Input() news_list: NewsModel[] | undefined;

  ngOnInit() {
    if (!this.news_list) {
      this.news_list = news_list;
    }
  }
}
