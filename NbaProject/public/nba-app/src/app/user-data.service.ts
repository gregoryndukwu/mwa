import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from './users/users.component';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  public authourizedUser = {
    name: '',
    authorized: false,
  };
  baseUrl: string = 'http://localhost:5355/api/';
  public errorMsg: string | undefined = undefined;
  constructor(private _http: HttpClient) {}

  public registerUser(user: User) {
    console.log(user);
    return this._http.post(this.baseUrl + 'users/', user);
  }

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(this.baseUrl + 'users/');
  }

  userLogin(user: User): Observable<any> {
    return this._http.post<any>(this.baseUrl + 'login', user);
  }
}
