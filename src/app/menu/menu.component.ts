import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  gridSizeSelection: number[] = [10,10]; // default size

  @Output() sizeEvent: EventEmitter<number[]> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  sendGridSize(size:number[]) {
    console.log('child: ' + size);
    this.sizeEvent.emit(size);
  }

}
