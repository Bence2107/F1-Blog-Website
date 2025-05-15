import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {CustomsnackbarComponent} from '../../../components/customsnackbar/customsnackbar.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AsyncPipe, NgIf} from '@angular/common';
import {BehaviorSubject} from 'rxjs';
import {UserModel} from '../../../models/user_model';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './signup.component.html',
  imports: [
    MatLabel,
    MatInput,
    MatFormField,
    ReactiveFormsModule,
    MatButton,
    MatIcon,
    RouterLink,
    AsyncPipe,
    NgIf
  ],
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  signupError = new BehaviorSubject<string>("");

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private snackBar: MatSnackBar) {
    this.registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  signup() {
      if(this.registerForm.invalid) {
        this.signupError.next("Hiba! Kérem javítsa a hibás bemeneteket!");
        return;
      }

      const password = this.registerForm.get('password')?.value;
      const confirmPassword = this.registerForm.get('confirmPassword')?.value;

      if(password !== confirmPassword) {
        this.signupError.next("A jelszók nem egyeznek!");
        return;
      }

      const userData:  Partial<UserModel> = {
        username: this.registerForm.get('username')?.value,
        email: this.registerForm.get('email')?.value,
        avatarUrl: false
      }

      const email = this.registerForm.value.email || '';
      const pw = this.registerForm.value.password || '';

      this.auth.signUp(email, pw, userData)
        .then(() => {
          this.router.navigate(['/home']);
          this.snackBar.openFromComponent(CustomsnackbarComponent, {
            data: { message: 'Sikeres Regisztráció!', actionLabel: 'Rendben' },
            duration: 3000,
            horizontalPosition: 'center',
          });
        })
        .catch(err => {
          console.log(err);

          switch (err.code) {
            case 'auth/email-already-in-use':
              this.signupError.next('Ezzel az email-el már regisztráltak. Kérem próbálkozzon másikkal!');
              break;
            case 'auth/invalid-email':
              this.signupError.next('Helytelen email. Kérem próbálkozzon másikkal!');
              break;
            case 'auth/weak-password':
              this.signupError.next('A jelszó túl rövid, legalább 6 karakter!')
              break;
            default:
              this.signupError.next("Hiba történt! Kérem próbákozzon később!");
          }
        })
  }

  ngOnInit() {}

}
