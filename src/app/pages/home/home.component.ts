import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimaryNewsListComponent} from './components/primary-news-list/primary-news-list.component';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {MatTooltip} from '@angular/material/tooltip';
import {AuthService} from '../../services/auth/auth.service';
import {CustomsnackbarComponent} from '../../components/customsnackbar/customsnackbar.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    PrimaryNewsListComponent,
    MatButton,
    MatTooltip,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  loggedId : string | undefined = undefined;
  isLoggedIn: boolean = false;

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) {}


  ngOnInit(){
    this.auth.isLoggedIn().subscribe(user => {
      this.isLoggedIn = !!user;
      this.loggedId = user?.uid;
    });

  }

  async routeToRegister() {
    if(this.isLoggedIn){
      this.snackBar.openFromComponent(CustomsnackbarComponent, {
        data: { message: 'Már regisztrált!', actionLabel: 'Rendben' },
        duration: 3000,
        horizontalPosition: 'center',
      });
    }
    else{
      await this.router.navigate(['/signup'])
      window.location.reload();
    }
  }
}
