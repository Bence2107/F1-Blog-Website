import {Component, OnInit} from '@angular/core';
import {NewsModel} from '../../models/news_model';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {news_list_list} from '../../constants/news';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-article',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {
  article!: NewsModel | any

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const url = this.route.snapshot.paramMap.get('url');
    this.article = news_list_list.find(item => item.url === url);
  }
}
