import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

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
}
