import {Injectable} from '@angular/core';
import {UserModel} from '../../models/user_model';
import {AuthService} from '../auth/auth.service';
import {Firestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private auth: AuthService, private firestore: Firestore) {}

  async getUserById(userId: string): Promise<UserModel | null> {
    const userData = await this.auth.getUserById(userId);

    if (!userData) {
      throw new Error("User not found");
    }
    return {
      id: userData.id,
      email: userData.email,
      username: userData.username,
      avatarUrl: userData.avatarUrl
    } as UserModel
  }
}
