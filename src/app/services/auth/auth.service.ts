import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  authState,
  User,
  UserCredential, createUserWithEmailAndPassword
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {collection, doc, Firestore, getDoc, setDoc} from '@angular/fire/firestore';
import {UserModel} from '../../models/user_model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: Observable<User | null>;

  constructor(
    private auth: Auth, private firestore: Firestore, private router: Router) {
    this.currentUser = authState(this.auth);
  }

  signIn (email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut() : Promise <void> {
    return signOut(this.auth).then(() => {
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('userId');
      this.currentUser = new Observable(observer => {observer.next(null)});
      this.router.navigate(['/home']);
    });
  }

  async signUp(email: string, password: string, userData: Partial<UserModel>): Promise<UserCredential> {
    try {
      const userCredentical = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password,
      );

      await this.createUserData(userCredentical.user.uid, {
        ...userData,
        id: userCredentical.user.uid,
        email: email,
        username: userData.username,
        avatarUrl: userData.avatarUrl,
      });
      localStorage.setItem('userId', userCredentical.user.uid);
      return userCredentical;
    } catch (error) {
      throw error;
    }
  }

  private async createUserData(userId: string, userData: Partial<UserModel>): Promise<void> {
    return await setDoc(doc(collection(this.firestore, 'Users'), userId), userData);
  }

  isLoggedIn(): Observable<User | null> {
    return this.currentUser;
  }

  updateLogInStatus(isLoggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', isLoggedIn ?  'true' : 'false');
  }

  async getUserById(userId: string): Promise<any> {
    const userRef = doc(this.firestore, `Users/${userId}`);
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
      return {id: snapshot.id, ...snapshot.data()};
    } else {
      throw new Error('User not found');
    }
  }


}
