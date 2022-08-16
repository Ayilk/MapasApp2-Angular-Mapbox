import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];
  
  get isUserLocationReady(): boolean{
    // !this.userLocation   No hay un valor en el userLocation
    // !!this.userLocation Negamos que no haya un valor en el userLocation
    return !!this.userLocation;
  }
  constructor() { 
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
}
