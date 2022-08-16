import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styles: [
  ]
})
export class MapViewComponent implements OnInit {

  constructor(private placesService: PlacesService) { }

  ngOnInit(): void {
    console.log(this.placesService.userLocation)
  }

}
