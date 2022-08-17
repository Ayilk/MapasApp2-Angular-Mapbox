import { Component } from '@angular/core';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styles: [`
    button{
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 999;
    }
  `
  ]
})
export class BtnMyLocationComponent  {

  constructor() { }

 goToMyLocation(){
  console.log('Ir a mi ubicacion')
 }

}
