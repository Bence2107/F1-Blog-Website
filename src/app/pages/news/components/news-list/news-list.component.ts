import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {NewsListModel} from '../../../../models/news_list_model';
import {NewsListService} from '../../../../services/news/news-list.service';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-news-list',
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    MatProgressBar,
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
