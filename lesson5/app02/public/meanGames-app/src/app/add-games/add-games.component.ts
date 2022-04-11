import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-add-games',
  templateUrl: './add-games.component.html',
  styleUrls: ['./add-games.component.css'],
})
export class AddGamesComponent implements OnInit {
  addForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private gameService: GamesDataService
  ) {
    this.addForm = formBuilder.group({
      title: '',
      rate: 0,
      price: 0.0,
      year: 0,
      minPlayers: 0,
      maxPlayers: 0,
      minAge: 0,
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('This is onSubmit');

    this.gameService
      .addGame(this.addForm.value)
      .subscribe((output: any) => console.log('Success', output));
  }
}
