import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';
import {NewsListModel} from '../../../../models/news_list_model';
import {NewsListService} from '../../../../services/news/news-list.service';

@Component({
  selector: 'app-news-list',
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
})
export class NewsListComponent implements OnInit {
  news_list: NewsListModel[] = [];

  constructor(private news_listService: NewsListService) {}

  ngOnInit() {
    this.news_listService.getNewsLists().subscribe(
      news_list => {
        this.news_list = news_list;
      }
    )
  }
}
