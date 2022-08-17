import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse, Route } from '../interfaces/directions';
import { Feature } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map;
  
  //Resolviendo marcadores de resultados
  private markers: Marker[] = []; 
  
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

  createMarkersFromPlaces( places: Feature[], userLocation: [number, number]){
    //Evaluamos si tenemos un mapa
    if(!this.map) throw Error ("Mapa no inicializado");

    //Voy a barrer cada uno de los marcadores y borrarlos fisicamente en el mapa pero siguen existiendo en el arreglo
    this.markers.forEach(marker => marker.remove());
    //Barro cada uno de los lugares y creo nuevos marcadores que guardo en un arreglo
    const newMarkers = [];

    for(const place of places){
      const [ lng, lat ] = place.center;
      const popup = new Popup()
        .setHTML(` 
        <h6>${ place.text }</h6>
        <span>${ place.place_name }</span>
        `);
        const newMarker = new Marker()
          .setLngLat([lng,lat])
          .setPopup( popup )
          .addTo( this.map )

        newMarkers.push( newMarker );
    }
    this.markers = newMarkers;

    //Si ya no hay marcadores no tiene sentido lo demas
    if( places.length === 0 ) return;

    //Limites del mapa
    //Espera un objeto de tipo lng lat
    //const bounds = new LngLatBounds(
      //Pide mas de uno. Definir un arreglo de pares de coordenadas
      // this.markers[0].getLngLat(),
      // this.markers[0].getLngLat(),      
      //);
      const bounds = new LngLatBounds();
      newMarkers.forEach( marker => bounds.extend( marker.getLngLat() ) );
      bounds.extend( userLocation );
   // bounds.extend()
    this.map.fitBounds(bounds, {
      padding: 200
    })
  }

  getRouteBetweenPoints( start: [number,number], end: [number, number]){
    
    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')}; ${end.join(',')}`)
      .subscribe(resp => {
        console.log(resp)
        this.drawPolyline( resp.routes[0] )
      })
  }

  private drawPolyline( route: Route){
    console.log({kms:  route.distance / 1000, duration: route.duration /60})

    if(!this.map) throw Error("Mapa no inicializado");

    const coords = route.geometry.coordinates;
   // const start = coords[0] as [number, number];

    const bounds = new LngLatBounds();
    coords.forEach( ([lng, lat]) => {
      bounds.extend([lng, lat])
    })

    this.map?.fitBounds( bounds, {
      padding: 200
    })
  }

  constructor(private directionsApi: DirectionsApiClient) { }
}
