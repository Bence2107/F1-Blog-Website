import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import {map, Observable} from 'rxjs';
import {CommentModel} from '../../models/comment_model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentsCollection;

  constructor(private firestore: Firestore) {
    this.commentsCollection = collection(this.firestore, 'Comments');
  }

  getComments(): Observable<CommentModel & {profileImage: any }[]> {
    return collectionData(this.commentsCollection, { idField: 'id' }).pipe(
      map(comments => comments as CommentModel  & {profileImage: any }[])
    );
  }
}
