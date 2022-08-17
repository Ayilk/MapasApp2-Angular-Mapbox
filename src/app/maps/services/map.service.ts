import { Injectable } from '@angular/core';
import { LngLatLike, Map } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map;
  
  get isMapReady(){
    return !!this.map;
  }

  //Eventualmente necesito establecer el valor de este mapa, ya que es una propiedad privada
  //y no quiero que desde afuera se tenga control a ese nivel.
  setMap( map: Map){
    this.map = map
  }
  //Mapbox ofrece un objeto que nos sirve para acpetar diferentes objetos que mapbox comprende
  //Uno de esos es LngLtLike 
  flyTo(coords: LngLatLike){
    if(!this.isMapReady) throw Error("El mapa no esta inicializado");

    //flyTo es un metodo que viene incluido en Mapbox que me permiet moverme de posicion
    this.map?.flyTo({
      zoom:14,
      center: coords
    })
    //Con este metodo vamos a poder mover nuestro mapa a cualquier lugar desde nuestro servicio
  }
  constructor() { }
}
