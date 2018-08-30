import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  gridSizeSelection: number[] = [10,10]; // default size

  @Output() sizeEvent: EventEmitter<number[]> = new EventEmitter();

  gridSize: number[] = [];
  customColumns: number = 0;
  customRows: number = 0;
  hidden: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  sendGridSize(size: string) {
    console.log('size ' + size);
    switch(size) {
      case 'easy':
        this.gridSize = [15,15];
        break;
      case 'medium':
        this.gridSize = [20,20];
        break;
      case 'hard':
        this.gridSize = [25,25];
        break;
      case 'custom':
        this.gridSize = [this.customColumns, this.customRows];
        break;
    }
    this.hidden = true;
    this.sizeEvent.emit(this.gridSize);
  }

  setColumns(value: string) {
    this.customColumns = parseInt(value);
  }

  setRows(value: string) {
    this.customRows = parseInt(value);
  }

   // Hides elements
   isHidden (){
    if(this.hidden) {
      return 'none';
    }else {
      return '';
    }
  }

}
