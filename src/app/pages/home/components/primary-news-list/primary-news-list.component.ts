import {Component, Input, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {NewsListModel} from '../../../../models/news_list_model';
import {primary_news_list} from '../../../../constants/news';
import {RouterLink} from '@angular/router';
import {NewsListService} from '../../../../services/news/news-list.service';

@Component({
  selector: 'app-primary-news-list',
  imports: [
    NgForOf,
    RouterLink,
  ],
  templateUrl: './primary-news-list.component.html',
  styleUrl: './primary-news-list.component.scss'
})
export class PrimaryNewsListComponent implements OnInit {
  primary_news_list_: NewsListModel[] = [];

  constructor(private newsListService: NewsListService) {}

  ngOnInit() {
    this.newsListService.getNewsLists().subscribe(primary_news_list => {
      this.primary_news_list_ = primary_news_list.filter(item => item.isPrimary);
    })
  }

}
