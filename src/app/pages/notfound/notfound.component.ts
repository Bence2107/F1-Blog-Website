import { Component } from '@angular/core';
import { MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-notfound',
  imports: [
    MatIcon,
    MatFabButton,
    RouterLink,

  ],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss'
})
export class NotfoundComponent {

}
