import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

class Credentials {
  username!: string;
  password!: string;
  /*
  constructor(username:string, password:string){
    this.username = username;
    this.password = password;
  } */
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //@ViewChild('loginForm');
  loginForm!: NgForm;

  //credential: Credentials = new Credentials();

  username: string = 'Jack';
  password: string = '123';
  constructor() {
    //  this.credential= new Credentials("Jack", "123")
  }

  ngOnInit(): void {}
  login(loginForm: NgForm): void {
    console.log('Login called');
    console.log(loginForm.value);
  }
}
