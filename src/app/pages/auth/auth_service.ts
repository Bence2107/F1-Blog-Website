import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {UserModel} from '../../models/user_model';
import {users_list} from '../../constants/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private loggedIdSubject = new BehaviorSubject<number | null>(null);

  loggedId$ = this.loggedIdSubject.asObservable();

  constructor(private router: Router) {}

  setLoggedInStatus(status: boolean, id: number | null): void {
    this.isLoggedInSubject.next(status);
    this.loggedIdSubject.next(id);
  }

  getLoggedInStatus(): boolean {
    return this.isLoggedInSubject.value;
  }

  getLoggedId(): number | null {
    return this.loggedIdSubject.value;
  }

  login(id: number | null): void {
    this.setLoggedInStatus(true, id);
    this.router.navigate(['/home']);
  }

  logout(): void {
    this.setLoggedInStatus(false, null);
    this.router.navigate(['/home']);
  }

  getLoggedInUser(): Observable<UserModel | null> {
    return this.loggedId$.pipe(
      map(id => {
        if (id !== null) {
          const user = users_list.find(user => user.id === id);
          return user ?? null;
        }
        return null;
      })
    );
  }
}
