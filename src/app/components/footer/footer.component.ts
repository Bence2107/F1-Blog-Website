import {Component} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [
    NgForOf,
    NgClass,
  ],
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  socialLinks = [
    { label: 'Formula 1 Official Website', url: 'https://www.formula1.com', icon: 'fas fa-globe' },
    { label: 'F1 Twitter', url: 'https://twitter.com/F1', icon: 'fab fa-twitter' },
    { label: 'F1 Instagram', url: 'https://instagram.com/f1', icon: 'fab fa-instagram' },
    { label: 'F1 YouTube', url: 'https://www.youtube.com/F1', icon: 'fab fa-youtube' },
    { label: 'F1 Facebook', url: 'https://www.facebook.com/Formula1', icon: 'fab fa-facebook' }
  ];
}
