import {Component, OnInit} from '@angular/core';
import {NewsListModel} from '../../models/news_list_model';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {news_article_list, review_article_list} from '../../constants/articles';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-article',
  imports: [
    NgIf,
    RouterLink,
    MatButton,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {
  article!: NewsListModel | any

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadArticle();
    this.route.paramMap.subscribe(() => {
      this.loadArticle();
      this.scrollToTop();
    });
  }
  loadArticle() : void {
    const url = this.route.snapshot.paramMap.get('url');
    this.article = news_article_list.find(item => item.url === url);
    if (!this.article) {
      this.article = review_article_list.find(item => item.url === url);
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
