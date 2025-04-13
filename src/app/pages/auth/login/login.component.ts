import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../auth_service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CustomsnackbarComponent} from '../../../components/customsnackbar/customsnackbar.component';

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
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router,  private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.auth.login(2) //login dummy with id (not checking all users)

    this.snackBar.openFromComponent(CustomsnackbarComponent, {
      data: { message: 'Sikeres Bejelentkezés', actionLabel: 'Rendben' },
      duration: 3000,
      horizontalPosition: 'center',
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }

  ngOnInit(): void {
    if(this.auth.getLoggedInStatus()){
      this.router.navigate(['/profile', this.auth.getLoggedId()]);
    }
  }
}
