import {Component, Input} from '@angular/core';
import {NgForOf} from '@angular/common';
import {NewsListModel} from '../../../../models/news_list_model';
import {primary_news_list} from '../../../../constants/news';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-primary-news-list',
  imports: [
    NgForOf,
    RouterLink,
  ],
  templateUrl: './primary-news-list.component.html',
  styleUrl: './primary-news-list.component.scss'
})
export class PrimaryNewsListComponent {
  @Input() news_list: NewsListModel[] | undefined;

  ngOnInit() {
    if (!this.news_list) {
      this.news_list = primary_news_list;
    }
  }

}
