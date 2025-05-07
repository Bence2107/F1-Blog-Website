import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CustomsnackbarComponent} from '../../../components/customsnackbar/customsnackbar.component';
import {AuthService} from '../../../services/auth/auth.service';
import {NgIf} from '@angular/common';

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
  ],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  loginForm: FormGroup;
  loginError: string = "";
  userData: any;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
    });
  }

  login() {
    if(this.email.invalid) {
      this.loginError = "Kérem, helyes Email-t adjon meg!";
      return;
    }

    if (this.password.invalid) {
      this.loginError = "A jelszó 6 karakter";
      return;
    }

    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';

    this.auth.signIn(emailValue, passwordValue)
      .then(userCredential => {
        console.log("Login Success: " + userCredential.user);
        return this.auth.getUserById(userCredential.user.uid);
      })
      .then(userData => {
        this.auth.updateLogInStatus(true);
        this.router.navigate(['/home']);
        localStorage.setItem("userId", userData.id);
        this.snackBar.openFromComponent(CustomsnackbarComponent, {
          data: { message: 'Sikeres Bejelentkezés', actionLabel: 'Rendben' },
          duration: 3000,
          horizontalPosition: 'center',
        });
      })
      .catch(error => {
        console.log("Login Error: " + error);
        switch (error.code) {
          case 'auth/user-not-found':
            this.loginError = 'Nincs ilyen felhasználó';
            break;
          case 'auth/wrong-password':
            this.loginError = 'Helytelen jelszó';
            break;
          case 'auth/invalid-credential':
            this.loginError = 'Helytelen Email vagy jelszó!';
            break;
          default:
            this.loginError = "Hiba történt, kérem próbálja újra!";
        }
      });
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if(userId) {
      this.auth.getUserById(userId).then((user) => {
        this.userData = user;
      });
    }
    if (this.userData || this.auth.isLoggedIn()) {
      this.router.navigate(["/login"]);
    }
  }
}
