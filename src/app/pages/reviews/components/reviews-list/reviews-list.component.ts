import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from '@angular/router';
import {NewsListModel} from '../../../../models/news_list_model';
import {ReviewsListService} from '../../../../services/news/reviews-list.service';

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
  reviews_list: NewsListModel[] = [];

  constructor(private reviews_listService: ReviewsListService) {}

  ngOnInit() {
    this.reviews_listService.getReviewsList().subscribe(
      reviews_list => {
        this.reviews_list = reviews_list;
      }
    )
  }
}
