import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Map, Popup, Marker} from 'mapbox-gl';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styles: [`
    .map-container{
      position: fixed;
      background-color: red;
      height: 100vh;
      right: 0px;
      top: 0px;
      width: 100vw;
    }
  `
  ]
})
export class MapViewComponent implements OnInit, AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef

  constructor( private placesService: PlacesService ) { }

  ngAfterViewInit(): void {
    if(!this.placesService.userLocation) throw Error("No hay placesServices.userLocation");
    
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
      //projection: 'globe' // display the map as a 3D globe
      });
      map.on('style.load', () => {
      map.setFog({}); // Set the default atmosphere style
      });
    
      const popup = new Popup()
      .setHTML(`
        <h6>Aqui estoy</h6>
        <span>Estoy en este lugar del mundo</span>
      `);

      new Marker({color: 'red'})
        .setLngLat( this.placesService.userLocation )
        .setPopup( popup )
        .addTo( map )
  }

  ngOnInit(): void {
    console.log(this.placesService.userLocation);
  }

}
