import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  #isLoggedIn: boolean = false;
  #token: string = '';

  set isLoggedIn(isLoggedIn) {
    this.#isLoggedIn = isLoggedIn;
  }

  get isLoggedIn() {
    return this.#isLoggedIn;
  }

  set token(token) {
    localStorage.setItem('michaelJordan', token);
    this.#isLoggedIn = true;
  }
  get token() {
    return localStorage.getItem('michaelJordan') as string;
  }

  get name() {
    let name = 'Uknown';
    if (this.token) {
      name = this._jwtService.decodeToken(this.token).name;
    }

    return name;
  }

  constructor(private _jwtService: JwtHelperService) {}

  deleteToken() {
    localStorage.clear();
    this.#isLoggedIn = false;
  }
}
