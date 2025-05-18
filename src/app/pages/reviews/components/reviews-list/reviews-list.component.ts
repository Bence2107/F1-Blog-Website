import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from '@angular/router';
import {NewsListModel} from '../../../../models/news_list_model';
import {ReviewsListService} from '../../../../services/news/reviews-list.service';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-reviews-list',
  imports: [
    NgForOf,
    RouterLink,
    NgIf,
    MatProgressBar
  ],
  templateUrl: './reviews-list.component.html',
  styleUrl: './reviews-list.component.scss'
})
export class ReviewsListComponent implements OnInit {
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
