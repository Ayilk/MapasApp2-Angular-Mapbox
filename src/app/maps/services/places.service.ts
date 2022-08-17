import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api';
import { Feature, PlacesResponse } from '../interfaces/places';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];
    
  public isLoadingPlaces: boolean =false;
  public places: Feature[] = [];
  
  get isUserLocationReady(): boolean{
    // !this.userLocation   No hay un valor en el userLocation
    // !!this.userLocation Negamos que no haya un valor en el userLocation
    return !!this.userLocation;
  }

  //Una vez que creamos nuestro http personalizado, injectamos ese placesApiClient
  //constructor(private http: HttpClient) { 
    constructor(private placesApi: PlacesApiClient,
                private mapService: MapService) { 
    //Mandamos a llamar el getUserLocation tan pronto algun lugar usa nuestros servicios
    //Y solo se va a mandar a llamar una unica vez
    this.getUserLocation();
  }

  //Creamos un metodo que me sirva para saber cuando ya tengo la geolocalizacion
  //Desafortunadamente el getCurrentPosition del navigation.geolocation no trabaja en base a promesas
  //ni tampoco en base a Observables (Trabaja en base a callbacks). Por lo que vamos a tener que hacer un cierto tipo de conversion 
  //para que esto sea una promesa y podamos saber en todo momento cuando ya se cumplió esto

  getUserLocation():Promise<[number,number]>{
    return new Promise( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ( {coords}) => {
          this.userLocation = [coords.longitude, coords.latitude];
          console.log( this.userLocation)
          resolve( this.userLocation );
        },
        ( err ) => {
          alert("No se puedo obtener la geolocalización");
          console.log(err);
          reject();
        }
      )
    })
  }

  getPlacesByQuery( query: string = ''){
    //Evaluamos cuando si el string es nulo
    if( query.length === 0 ){
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    if(!this.userLocation) throw Error("No hay userLocation");

    this.isLoadingPlaces = true;

    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.userLocation?.join(',')
      }
    })
      .subscribe(resp => {
        console.log( resp.features)

        this.isLoadingPlaces = false;
        this.places = resp.features;

        this.mapService.createMarkersFromPlaces( this.places, this.userLocation! );
      })
  }

  deletePlaces(){
    this.places = [];
  }
}
