import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styles: [`
    .search-container {
      position: fixed;
      top: 20px;
      left: 20px;
      background-color: white;
      padding: 5px;
      box-shadow: 0px 10px 10px rgba(0,0,0,0.1);
      border-radius: 5px;
      border: 1px solid rgba(0,0,0,0.1);
      width: 270px;
    }
  `
  ]
})
export class SearchBarComponent implements OnInit {
  //El timer que voy implementar para esperarme y ahi emitir el valor
  //Aparece un error en donde no se logra encontrar el namespace de NodeJS
  //Para eso lo escribimo de manera manual en tsconfiig.app.js y dentro de los types escribimos "node"
  //Tambien lo definimos en el tsconfig.json
  private debounceTimer?: NodeJS.Timeout;

  constructor(private placesService: PlacesService) { }

  onQueryChanged( query: string = ''){
   // console.log( query )

   //Cada que recibimos un nuevo valor de query que cambio, vamos a evaluar y limpiarlo
    if(this.debounceTimer ) clearTimeout( this.debounceTimer )

    //Cada que escribimos en la caja de texto, la instruccion se ejecuta y se limpi, se ejecuta y se limpia
    //solo el ultimo se mantiene, despues de un segundo es que se emite el query
    this.debounceTimer = setTimeout(() => {
      console.log("Mandar este query:", query);
      this.placesService.getPlacesByQuery( query ); 
    }, 350)

  }

  ngOnInit(): void {
  }

}
