import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  news_list = [
    { id: "1", label: 'Fehérbe borul a Red Bull', desc: "Japán versenyző, japán festés" },
    { id: "2", label: 'Áttörést találhatott a Ferrari', desc: "20 különböző szimulátor tapasztalat után visszatérhetnek a Pirosak?" },
    { id: "3", label: 'Lawsont sokként érte a Red Bull döntése', desc: " Tsunoda adott esetben legyőzheti Verstappent" },
  ];
}
