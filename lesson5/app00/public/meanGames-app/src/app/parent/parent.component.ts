import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnInit {
  y: number = 0;
  x: number = 0;
  z: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
