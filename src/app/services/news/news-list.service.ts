import { Injectable } from '@angular/core';
import {collection, Firestore, getDocs, orderBy, query, where} from '@angular/fire/firestore';
import {NewsListModel} from '../../models/news_list_model';

@Injectable({
  providedIn: 'root'
})
export class NewsListService {
  private readonly newsListColleciton;

  constructor(private firestore: Firestore) {
    this.newsListColleciton = collection(this.firestore, 'News_List')
  }

  async getNewsLists(): Promise<NewsListModel[]> {
    const q = query(this.newsListColleciton,
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);

    const articles: NewsListModel[] = [];
    querySnapshot.forEach(doc => {
      articles.push(doc.data() as NewsListModel);
    });

    return articles;
  }
  async getPrimaryNews(): Promise<NewsListModel[]> {
    const q = query(this.newsListColleciton,
      where('isPrimary', '==', true),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);

    const articles: NewsListModel[] = [];
    querySnapshot.forEach(doc => {
      articles.push(doc.data() as NewsListModel);
    });

    return articles;
  }
}
