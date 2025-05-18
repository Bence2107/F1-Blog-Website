import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  orderBy
} from '@angular/fire/firestore';
import {map, Observable} from 'rxjs';
import {CommentModel} from '../../models/comment_model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly commentsCollection;

  constructor(private firestore: Firestore) {
    this.commentsCollection = collection(this.firestore, 'Comments');
  }

  getComments(): Observable<(CommentModel & { profileImage: any })[]> {
    const q = query(this.commentsCollection, orderBy('timestamp', 'desc'));

    return collectionData(q, { idField: 'id' }).pipe(
      map(comments => comments as (CommentModel & { profileImage: any })[])
    );
  }

  async getUsersComments(userId: string): Promise<CommentModel[]> {
    const q = query(this.commentsCollection,
      orderBy('timestamp', 'desc'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);

    const comments: CommentModel[] = [];
    querySnapshot.forEach(doc => {
      comments.push(doc.data() as CommentModel);
    });

    return comments;
  }

  async addComment(comment: any): Promise<void> {
    try {
      const docRef = await addDoc(this.commentsCollection, {...comment});
      await updateDoc(docRef, { id: docRef.id });
    } catch (error) {
      console.error('Hiba a komment létrehozásakor:', error);
    }
  }

  async updateComment(commentId: string, newContent: string): Promise<void> {
    const commentRef = doc(this.commentsCollection, commentId);
    await updateDoc(commentRef, { content: newContent });
  }


  async deleteComment(comment: CommentModel): Promise<void> {
    if (!comment.id) {
      return;
    }

    try {
      const commentRef = doc(this.commentsCollection, comment.id);
      await deleteDoc(commentRef);
    } catch (error) {
      console.error('Hiba történt a komment törlésekor:', error);
    }
  }
}
