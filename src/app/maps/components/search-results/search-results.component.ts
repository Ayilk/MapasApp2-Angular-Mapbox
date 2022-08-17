import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
