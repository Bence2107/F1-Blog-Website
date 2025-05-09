import {Component, OnInit} from '@angular/core';
import {NewsListModel} from '../../models/news_list_model';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {news_article_list, review_article_list} from '../../constants/articles';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ArticleCommentsComponent} from './components/article-comments/article-comments.component';

@Component({
  selector: 'app-article',
  imports: [
    NgIf,
    RouterLink,
    MatButton,
    MatIcon,
    ArticleCommentsComponent,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {
  article!: NewsListModel | any

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loadArticle();
    this.route.paramMap.subscribe(() => {
      this.loadArticle();
    });
  }
  loadArticle() : void {
    const url = this.route.snapshot.paramMap.get('url');
    this.article = news_article_list.find(item => item.url === url);
    if (!this.article) {
      this.article = review_article_list.find(item => item.url === url);
      if(!this.article) {
        this.router.navigate(['/news'])
      }
    }
  }
}
