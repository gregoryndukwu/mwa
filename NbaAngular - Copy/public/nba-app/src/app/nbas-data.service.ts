import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Nba } from './nbas/nbas.component';

@Injectable({
  providedIn: 'root',
})
export class NbaDataService {
  baseUrl: string = 'http://localhost:5355/api';
  constructor(private http: HttpClient) {}

  public getNbas(): Observable<Nba[]> {
    return this.http.get<Nba[]>(this.baseUrl + '/nba');
  }

  public getOne(nbaId: string): Observable<Nba> {
    console.log('get One Teams');
    return this.http.get<Nba>(this.baseUrl + '/nba/' + nbaId);
  }
  public deleteNba(nbaId: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/nba/' + nbaId);
  }

  addOne(newOne: any) {
    const url: string = this.baseUrl + '/nba/';
    return this.http.post(url, newOne);
  }
  addCoache(newCoache: any, nbaId: string) {
    console.log(newCoache);

    const url: string = this.baseUrl + '/nba/' + nbaId + '/coaches';
    return this.http.post(url, newCoache);
  }
  deleteCoache(coacheId: any, nbaId: string) {
    const url: string = this.baseUrl + '/nba/' + nbaId + '/coaches/' + coacheId;
    return this.http.delete(url);
  }
  register(newUser: any) {
    const url: string = this.baseUrl + '/users/';
    return this.http.post(url, newUser);
  }
  updateTeam(updateTeam: any, nbaId: string) {
    const url: string = this.baseUrl + '/nba/' + nbaId;
    return this.http.put(url, updateTeam);
  }
}
