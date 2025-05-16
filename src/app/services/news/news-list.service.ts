import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';
import {NewsListModel} from '../../models/news_list_model';

@Injectable({
  providedIn: 'root'
})
export class NewsListService {
  private newsListColleciton;

  constructor(private firestore: Firestore) {
    this.newsListColleciton = collection(this.firestore, 'News_List')
  }

  getNewsLists(): Observable<NewsListModel[]> {
    return collectionData(this.newsListColleciton, { idField: 'id' }).pipe(
      map(news_list => news_list as NewsListModel[])
    );
  }
}
