import { Component, OnInit, Input, OnChanges,  Output, EventEmitter} from '@angular/core';

import { SquareComponent } from '../square/square.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  // @Output() menuShowEvent: EventEmitter<boolean> = new EventEmitter();
  squares: SquareComponent[][];
  gameOver: boolean = false;
  @Input() gridSize: number[];
  columns: number;
  rows: number;
  // @Input() gridHidden: boolean = true;

  constructor() { }

  ngOnInit() {
    // console.log(this.gridSize);
    this.columns = this.gridSize[0];
    this.rows = this.gridSize[1];
    this.newGrid();
  }
  
  ngOnChanges() {
    // console.log('change');
    this.columns = this.gridSize[0];
    this.rows = this.gridSize[1];
    this.newGrid();
  }


  // Handles square click event
  onClick (square: SquareComponent) {
    if(square.state != '0' && square.state != 'm'){
      if(square.state == 'x'){
        this.lose();
        alert('You lose!');
        // this.newGrid();
      }
      square.bCount = square.state;
    }else{
      square.state = 'm';
      square.bCount = ' ';
    }
    this.clearSpread();
    this.edgeReveal();
    if(this.checkWin()){
      alert('You win!');
    }
  }

  onRightClick (square: SquareComponent) {
    square.bCount = 'f';
    return false;
  }

  // Returns a colour depending on button state
  getColour (bCount: string) {
    switch(bCount) {
      case 'x':
        return '#F95738';
      case ' ':
        return 'darkgrey';
      case 'f':
        return '#EE964B';      
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
              if(this.squares[i][j-1].state == 'm' || this.squares[i][j-1].bCount != '') {
                this.squares[i][j].state = 'm';
                this.squares[i][j].bCount = ' ';
                finished = false;
              }
            }
            catch(err) {}
            try {
              if(this.squares[i][j+1].state == 'm' || this.squares[i][j+1].bCount != '') {
                this.squares[i][j].state = 'm';
                this.squares[i][j].bCount = ' ';
                finished = false;
              }
            }
            catch(err) {}
            try {
              if(this.squares[i-1][j].state == 'm' || this.squares[i-1][j].bCount != '') {
                this.squares[i][j].state = 'm';
                this.squares[i][j].bCount = ' ';
                finished = false;
              }
            }
            catch(err) {}
            try {
              if(this.squares[i+1][j].state == 'm' || this.squares[i+1][j].bCount != '') {
                this.squares[i][j].state = 'm';
                this.squares[i][j].bCount = ' ';
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

  // Losing the game
  lose() {
    for(let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.columns; j++) {
        if(this.squares[i][j].state == 'x'){
          this.squares[i][j].bCount = 'x';
        }
      }
    }
    this.gameOver = true;
  }

  // Check for winning conditions
  checkWin() {
    for(let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.columns; j++) {
        if(this.squares[i][j].bCount == '' && this.squares[i][j].state != 'x' && this.squares[i][j].state != 'm' && this.squares[i][j].state != 'f') {
          return false;
        }
      }
    }
    return true;
  }

  // Generate a grid
  newGrid() {
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

}
