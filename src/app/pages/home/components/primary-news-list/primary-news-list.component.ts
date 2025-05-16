import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {NewsListModel} from '../../../../models/news_list_model';
import {RouterLink} from '@angular/router';
import {NewsListService} from '../../../../services/news/news-list.service';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-primary-news-list',
  imports: [
    NgForOf,
    RouterLink,
    NgIf,
    MatProgressBar,
  ],
  templateUrl: './primary-news-list.component.html',
  styleUrl: './primary-news-list.component.scss'
})
export class PrimaryNewsListComponent implements OnInit {
  primary_news_list: NewsListModel[] = [];

  constructor(private newsListService: NewsListService) {}

  ngOnInit() {
    this.newsListService.getPrimaryNews().then(articles => {
      this.primary_news_list = articles;
    });
  }
}
