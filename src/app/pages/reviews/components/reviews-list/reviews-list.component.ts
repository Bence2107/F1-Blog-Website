import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {review_article_list} from '../../../../constants/articles';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-reviews-list',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './reviews-list.component.html',
  styleUrl: './reviews-list.component.scss'
})
export class ReviewsListComponent {

  protected readonly review_article_list = review_article_list;
}
