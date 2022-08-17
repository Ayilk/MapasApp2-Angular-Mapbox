import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
Mapboxgl.accessToken = 'pk.eyJ1IjoiYXlpbGsiLCJhIjoiY2w2d3RwNnliMmw1azNvcnFwZWt1aTZzNCJ9.JkVfzgh5lWDorbqCez1ltg';

//Queremos obtener la geolocalización del usuario
// Este archivo es el punto de entrada de nuestra aplicación

//vamos a hacer una verificación
if( !navigator.geolocation ){
  throw new Error('Navegador no soporta la Geolocation')
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
