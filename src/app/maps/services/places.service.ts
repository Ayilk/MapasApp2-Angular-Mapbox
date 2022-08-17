import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';

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
  constructor(private http: HttpClient) { 
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

    this.isLoadingPlaces = true;

    this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=-99.17552331098469%2C19.669855610838624&language=es&access_token=pk.eyJ1IjoiYXlpbGsiLCJhIjoiY2w2d3RwNnliMmw1azNvcnFwZWt1aTZzNCJ9.JkVfzgh5lWDorbqCez1ltg`)
      .subscribe(resp => {
        console.log( resp.features)

        this.isLoadingPlaces = false;
        this.places = resp.features;
      })
  }
}
