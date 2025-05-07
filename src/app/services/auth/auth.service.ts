import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  authState,
  User,
  UserCredential
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {doc, Firestore, getDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: Observable<User | null>;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router) {
    this.currentUser = authState(this.auth);
  }

  signIn (email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut() : Promise <void> {
    localStorage.setItem('isLoggedIn', 'false');
    return signOut(this.auth).then(() => {
      this.router.navigate(['/home']);
    });
  }

  isLoggedIn (): Observable<User | null> {
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
