import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

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

  constructor(private mapService: MapService,
              private placesService: PlacesService) { }

 goToMyLocation(){
 // console.log('Ir a mi ubicacion')
 if(!this.placesService.isUserLocationReady) throw Error("No hay ubicacion del usuario");
 if(!this.mapService.isMapReady) throw Error("No hay mapa disponible");

  this.mapService.flyTo(this.placesService.userLocation!)
 }

}
