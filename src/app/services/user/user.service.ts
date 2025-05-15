import {Injectable} from '@angular/core';
import {UserModel} from '../../models/user_model';
import {AuthService} from '../auth/auth.service';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';
import {map, Observable} from 'rxjs';
import {CommentModel} from '../../models/comment_model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private cashedUser: UserModel | null = null;
  private usersCollection;

  constructor(private auth: AuthService,  private firestore: Firestore) {
    this.usersCollection = collection(this.firestore, 'Users');

  }

  async getUserById(userId: string): Promise<UserModel | null> {
    if (this.cashedUser && this.cashedUser.id === userId) {
      return this.cashedUser;
    }
    const userData = await this.auth.getUserById(userId);
    if (!userData) {
      throw new Error("User not found");
    }

    this.cashedUser = {
      id: userData.id,
      email: userData.email,
      username: userData.username,
      avatarUrl: userData.avatarUrl
    } as UserModel

    return this.cashedUser;
  }

  getAllUsers(): Observable<UserModel[]> {
    return collectionData(this.usersCollection, { idField: 'id' }).pipe(
      map(users => users as UserModel[])
    );
  }
}
