import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private loggedId: number | null = null;

  setLoggedInStatus(status: boolean, id: number | null): void {
    this.isLoggedIn = status;
    this.loggedId = id;
  }

  getLoggedInStatus(): boolean {
    return this.isLoggedIn;
  }

  getLoggedId(): number | null {
    return this.loggedId;
  }
}

