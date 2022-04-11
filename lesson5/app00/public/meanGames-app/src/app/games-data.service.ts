import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Game } from './games/games.component';

@Injectable({
  providedIn: 'root',
})
export class GamesDataService {
  baseUrl: string = 'http://localhost:5354/api';

  constructor(private http: HttpClient) {}

  public getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.baseUrl + '/games');
  }

  public getGame(gameId: string): Observable<Game> {
    return this.http.get<Game>(this.baseUrl + '/games/' + gameId);
  }

  public deleteGame(gameId: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/games/' + gameId);
  }
}
