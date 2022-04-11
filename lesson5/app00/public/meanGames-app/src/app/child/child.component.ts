import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit {
  constructor() {}

  @Input()
  x: number = 0;
  @Input()
  y: number = 0;
  z: number = 0;

  //addEvent:EventEmitter<number>= new EventEmitter<number>();

  ngOnInit(): void {}

  add(): void {
    this.z = this.x + this.y;
  }
}
