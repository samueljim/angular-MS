import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  size: number[] = [];

  constructor() { }

  ngOnInit() {
  }

  setGridSize(gridSize: number[]) {
    this.size = gridSize;
    console.log('parent: '+ this.size);
  }

}
