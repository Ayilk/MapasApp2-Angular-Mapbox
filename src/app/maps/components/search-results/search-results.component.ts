import { Component, OnInit } from '@angular/core';
import { Feature } from '../../interfaces/places';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styles: [`
  .pointer{
    cursor: pointer;
    }
    p{
      font-size: 12px;
    }
  `
  ]
})
export class SearchResultsComponent implements OnInit {
  
  public selectedId: string = '';

  constructor(private placeService: PlacesService,
              private mapService: MapService) { }

  get isLoadingPlaces():boolean{
    return this.placeService.isLoadingPlaces;
  }

  get places(): Feature[]{
    return this.placeService.places;
  }

  flyTo( place: Feature){
    //Con esto yo se todo el tiempo cual es el id seleccionado
    this.selectedId = place.id;

    const [lng, lat ] = place.center;
    this.mapService.flyTo([lng, lat])
  }

  
  getRouteBetweenPoints( place: Feature){
    if(!this.placeService.userLocation ) throw Error("No hay userLocation");

    this.placeService.deletePlaces();

    const start = this.placeService.userLocation!;
    const end = place.center as [number, number];

    this.mapService.getRouteBetweenPoints(start, end)
  }

  ngOnInit(): void {
  }

}
