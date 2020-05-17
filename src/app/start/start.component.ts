import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  providers: [NgbCarouselConfig], // add NgbCarouselConfig to the component providers
})
export class StartComponent {
  constructor() {}
  images = [
    'assets/images/1.png',
    'assets/images/2.png',
    'assets/images/3.png',
  ];
}
