import { Component } from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {FooterComponent} from '../../components/footer/footer.component';


@Component({
  selector: 'app-news',
  imports: [
    HeaderComponent,
    FooterComponent

  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {

}
