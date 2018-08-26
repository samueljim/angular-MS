import { Component, OnInit } from '@angular/core';

import { SquareComponent } from '../square/square.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  squares: SquareComponent[][];
  columns: number = 10;
  rows: number = 10;

  constructor() { }

  ngOnInit() {
    // Generate squares with 1 in 10 being a bomb
    this.squares = []; // initialise squares
    for(let i = 0; i < this.rows; i++) {
      let row: SquareComponent[] = [];
      for(let j = 0; j < this.columns; j++) {
        let isBomb: string = 'o';        
        if(Math.floor((Math.random() * 10) + 1) == 1){
          isBomb = 'x';
        }
        row.push(new SquareComponent(isBomb,'',[i,j]));
      }
      this.squares.push(row);
    }
    // Assign surrounding bomb value to each non-bomb square
    for(let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.columns; j++) {
        if(this.squares[i][j].state != 'x'){
          this.squares[i][j].state = String(this.getNumBombs(this.squares[i][j]));
        }
      }
    }

  }

  // Handles square click event
  onClick (square: SquareComponent) {
    // console.log('state: ' + square.state +'\nid: '+ square.id);
    // console.log(this.getNumBombs(square));
    square.state = 'm';
    this.clearSpread();
    this.edgeReveal();
    console.log(square.bCount);
  }

  // Returns a colour depending on button state
  getColour (state: string) {
    switch(state) {
      case 'x':
        return 'red';
      case 'm':
        return 'lightseagreen'
    }
  }

  // Converts a number into a coordinate based on grid width
  numberToCoord (square: number) {
    let over = square % this.columns;
    let rows = (square - over) / this.columns;
    if (over == 0){ // end of a row
        over = this.columns+1;
        rows -= 1;
    }
    return [rows, over-1];
  }

  // Returns the number of bombs surrounding a square
  getNumBombs (square: SquareComponent) {
    let numBombs: number = 0;
    for(let i = square.id[0]-1; i <= square.id[0]+1; i++){
      for(let j = square.id[1]-1; j <= square.id[1]+1; j++){
          try {
            if(this.squares[i][j].state == 'x'){
              numBombs ++;
            }
          }
          catch(err) { }
      }
    }
    return numBombs;    
  }

  // Clear out all connected 0 bomb squares when one is clicked
  clearSpread () {
    let finished = false;
    while(finished == false){
      finished = true;
      for(let i = 0; i < this.rows; i++) {
        for(let j = 0; j < this.columns; j++) {
          if(this.squares[i][j].state == '0') {
            try {
              if(this.squares[i][j-1].state == 'm') {
                this.squares[i][j].state = 'm';
                finished = false;
              }
            }
            catch(err) {}
            try {
              if(this.squares[i][j+1].state == 'm') {
                this.squares[i][j].state = 'm';
                finished = false;
              }
            }
            catch(err) {}
            try {
              if(this.squares[i-1][j].state == 'm') {
                this.squares[i][j].state = 'm';
                finished = false;
              }
            }
            catch(err) {}
            try {
              if(this.squares[i+1][j].state == 'm') {
                this.squares[i][j].state = 'm';
                finished = false;
              }
            }
            catch(err) {}
          }
        }
      }
    }
  }

  // Clear out all connected 0 bomb squares when one is clicked
  edgeReveal () {
    let finished = false;
    while(finished == false){
      finished = true;
      for(let i = 0; i < this.rows; i++) {
        for(let j = 0; j < this.columns; j++) {
          if(this.squares[i][j].state != 'm' &&
             this.squares[i][j].state != 'x' &&
             this.squares[i][j].state != '0') {
            try {
              if(this.squares[i][j-1].state == 'm' && this.squares[i][j].bCount == '') {
                this.squares[i][j].bCount = this.squares[i][j].state;
                finished = false;
              }
            }
            catch(err) {}
            try {
              if(this.squares[i][j+1].state == 'm' && this.squares[i][j].bCount == '') {
                this.squares[i][j].bCount = this.squares[i][j].state;
                finished = false;
              }
            }
            catch(err) {}
            try {
              if(this.squares[i-1][j].state == 'm' && this.squares[i][j].bCount == '') {
                this.squares[i][j].bCount = this.squares[i][j].state;
                finished = false;
              }
            }
            catch(err) {}
            try {
              if(this.squares[i+1][j].state == 'm' && this.squares[i][j].bCount == '') {
                this.squares[i][j].bCount = this.squares[i][j].state;
                finished = false;
              }
            }
            catch(err) {}
          }
        }
      }
    }
  }

}
