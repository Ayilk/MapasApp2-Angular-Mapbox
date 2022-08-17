import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-logo',
  templateUrl: './angular-logo.component.html',
  styles: [`
    img {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999;
    }
  `
  ]
})
export class AngularLogoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
