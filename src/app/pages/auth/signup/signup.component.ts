import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {AuthService} from '../auth_service';
import {CustomsnackbarComponent} from '../../../components/customsnackbar/customsnackbar.component';
import {MatSnackBar} from '@angular/material/snack-bar';

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
    RouterLink
  ],
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private snackBar: MatSnackBar) {
    this.registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  });
  }

  ngOnInit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
    if(this.auth.getLoggedInStatus()){
      this.router.navigate(['/profile', this.auth.getLoggedId()]);
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
    this.snackBar.openFromComponent(CustomsnackbarComponent, {
      data: { message: 'Sikeres Regisztráció! Lépj be!', actionLabel: 'Rendben' },
      duration: 3000,
      horizontalPosition: 'center',
    });
    this.router.navigate(['/login']);
  }
}
