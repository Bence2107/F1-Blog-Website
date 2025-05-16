import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {collection, collectionData, Firestore, getDocs, query, where} from '@angular/fire/firestore';
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
  async getPrimaryNews(): Promise<NewsListModel[]> {
    const q = query(this.newsListColleciton, where('isPrimary', '==', true));
    const querySnapshot = await getDocs(q);

    const articles: NewsListModel[] = [];
    querySnapshot.forEach(doc => {
      articles.push(doc.data() as NewsListModel);
    });

    return articles;
  }
}
