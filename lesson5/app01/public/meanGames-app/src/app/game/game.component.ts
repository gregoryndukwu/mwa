import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../games/games.component';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  game!: Game;

  constructor(
    private route: ActivatedRoute,
    private gamesDataService: GamesDataService
  ) {}

  ngOnInit(): void {
    console.log('bengs');
    const gameId = this.route.snapshot.params['gameId'];
    this.gamesDataService.getGame(gameId).subscribe((game) => {
      this.game = game;
    });
  }
}
