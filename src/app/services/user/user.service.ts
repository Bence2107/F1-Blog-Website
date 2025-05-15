import {Injectable} from '@angular/core';
import {UserModel} from '../../models/user_model';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private cashedUser: UserModel | null = null;

  constructor(private auth: AuthService) {
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
}
