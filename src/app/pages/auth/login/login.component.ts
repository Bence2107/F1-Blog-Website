import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CustomsnackbarComponent} from '../../../components/customsnackbar/customsnackbar.component';
import {AuthService} from '../../../services/auth/auth.service';
import {AsyncPipe, NgIf} from '@angular/common';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    RouterLink,
    NgIf,
    AsyncPipe,
  ],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  loginForm: FormGroup;
  loginError = new BehaviorSubject<string>("");
  userData: any;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private snackBar: MatSnackBar, private cdRef: ChangeDetectorRef) {
    this.loginForm = this.fb.group({
    });
  }

  login() {
    if(this.email.invalid) {
      this.loginError.next( "Kérem, helyes Email-t adjon meg!");
      return;
    }

    if (this.password.invalid) {
      this.loginError.next("A jelszó 6 karakter");
      return;
    }

    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';

    this.auth.signIn(emailValue, passwordValue)
      .then(userCredential => {
        return this.auth.getUserById(userCredential.user.uid);
      })
      .then(userData => {
        this.auth.updateLogInStatus(true);
        localStorage.setItem("userId", userData.id);

        this.router.navigate(['/home']);
        this.snackBar.openFromComponent(CustomsnackbarComponent, {
          data: { message: 'Sikeres Bejelentkezés', actionLabel: 'Rendben' },
          duration: 3000,
          horizontalPosition: 'center',
        });
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/too-many-requests':
            this.loginError.next('Túl sok kérés! Próbálkozzon később!');
            break;
          case 'auth/user-not-found':
            this.loginError.next('Nincs ilyen felhasználó');
            break;
          case 'auth/invalid-credential':
            this.loginError.next('Helytelen Email vagy jelszó!');
            break;
          default:
            this.loginError.next("Hiba történt, kérem próbálja újra!");
        }

        return new Promise(() => {});
      });
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if(userId) {
      this.auth.getUserById(userId).then((user) => {
        this.userData = user;
      });
    }
  }
}
