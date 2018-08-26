import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  constructor(
    private _state: string,
    private _bCount: string,
    private _id: number[]
  ) {}
  
  get state(): string {
    return this._state;
  }
  set state(newState: string) {
    this._state = newState;
  }
  get id(): number[] {
    return this._id;
  }
  set id(newId: number[]) {
    this._id = newId;
  }
  get bCount(): string {
    return this._bCount;
  }
  set bCount(newBCount: string) {
    this._bCount = newBCount;
  }

  ngOnInit() {
  }
}
