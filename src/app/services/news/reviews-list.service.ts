import { Injectable } from '@angular/core';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';
import {map, Observable} from 'rxjs';
import {NewsListModel} from '../../models/news_list_model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsListService {

  private newsListColleciton;

  constructor(private firestore: Firestore) {
    this.newsListColleciton = collection(this.firestore, 'Reviews_List')
  }

  getReviewsList(): Observable<NewsListModel[]> {
    return collectionData(this.newsListColleciton, {idField: 'id'}).pipe(
      map(news_list => news_list as NewsListModel[])
    );
  }
}
