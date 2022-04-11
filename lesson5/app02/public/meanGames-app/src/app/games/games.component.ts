import { Component, OnInit } from '@angular/core';
import { GamesDataService } from '../games-data.service';
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  constructor(private gamesDataService: GamesDataService) {}
  games: Game[] = [];

  ngOnInit(): void {
    this.getGames();
  }
  getGames() {
    this.gamesDataService.getGames().subscribe((games) => {
      console.log(games);
      this.games = games;
    });
  }

  deleteGame(gameId: string) {
    this.gamesDataService.deleteGame(gameId).subscribe((result) => {
      console.log(result);
      console.log('GAME DELETED !');
      this.getGames();
    });
  }
}

export class Game {
  #_id!: string;
  #title!: string;
  #year!: string;
  #rate!: number;
  #price!: number;
  #minPlayers!: number;
  #maxPlayers!: number;
  #minAge!: number;
  get _id() {
    return this.#_id;
  }
  get title() {
    return this.#title;
  }
  set title(title: string) {
    this.#title = title;
  }
  get year() {
    return this.#year;
  }
  get rate() {
    return this.#rate;
  }
  get price() {
    return this.#price;
  }
  set price(price: number) {
    this.#price = price;
  }
  get minPlayers() {
    return this.#minPlayers;
  }
  get maxPlayers() {
    return this.#maxPlayers;
  }
  get minAge() {
    return this.#minAge;
  }
  constructor(id: string, title: string, price: number) {
    this.#_id = id;
    this.#title = title;
    this.#price = price;
  }
}
