import { Injectable } from '@angular/core';
import {ArticleModel} from '../../models/article_model';
import {collection,query, Firestore, getDocs, where} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly articleCollection;

  constructor(private fireStore: Firestore) {
    this.articleCollection = collection(this.fireStore, 'Articles')
  }

  async getArticleByUrl(url: string | null): Promise<ArticleModel | undefined> {
    const q = query(this.articleCollection, where('url', '==', url));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data() as ArticleModel;
    }
    return undefined;
  }
}
