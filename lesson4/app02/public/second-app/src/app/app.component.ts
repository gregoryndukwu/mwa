import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'second-app';
  people: string[] = ["Jack", "Jhon", "Jill", "Gregory"];
  onClickBtn() {
    this.title = "Button Clicked";
  }
  students = [{ name: "Jack", course: "MWA", gpa: 3.0 },
  { name: "Jill", course: "MPP", gpa: 3.4 },
  { name: "Jim", course: "MWA", gpa: 2.8 }];
  today= new Date();


}




