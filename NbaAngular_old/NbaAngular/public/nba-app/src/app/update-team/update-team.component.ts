import { Component, OnInit } from '@angular/core';
import { NbaDataService } from '../nbas-data.service';
import { Nba } from '../nbas/nbas.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.css'],
})
export class UpdateTeamComponent implements OnInit {
  addForm!: FormGroup;
  nome = '';
  constructor(
    private formBuilder: FormBuilder,
    private nbasDataService: NbaDataService
  ) {
    this.currentURL = window.location.href;
    let arrayValues = this.currentURL.split('/');
    const nbaId = arrayValues[4];

    this.nbasDataService.getOne(nbaId).subscribe((nbas) => {
      this.addForm = formBuilder.group({
        name: nbas.name,
        championships: nbas.Championships,
        namecoache: nbas.coaches[0].name,
        position: nbas.coaches[0].position,
      });
    });
  }

  nbas: Nba[] = [];

  currentURL = '';

  ngOnInit(): void {
    this.getOne();
  }

  onSubmit(): void {}

  getOne() {
    this.currentURL = window.location.href;
    let arrayValues = this.currentURL.split('/');
    const nbaId = arrayValues[4];
    this.nbasDataService.getOne(nbaId).subscribe((nbas) => {});
  }

  mytest = this.nome; //this.nba.name;
}
