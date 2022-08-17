import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
