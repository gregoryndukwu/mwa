import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbaDataService } from '../nbas-data.service';
import { Nba } from '../nbas/nbas.component';

@Component({
  selector: 'app-update-all',
  templateUrl: './update-all.component.html',
  styleUrls: ['./update-all.component.css'],
})
export class UpdateAllComponent implements OnInit {
  addForm!: FormGroup;
  nome = '';
  globaID = '';
  constructor(
    private formBuilder: FormBuilder,
    private nbasDataService: NbaDataService
  ) {
    this.currentURL = window.location.href;
    let arrayValues = this.currentURL.split('/');
    const nbaId = arrayValues[4];
    this.globaID = nbaId;
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

  onSubmit(): void {
    const updateTeam = {
      name: this.addForm.value.name,
      Championships: this.addForm.value.championships,
    };

    // this.nbasDataService
    //   .updateTeam(updateTeam, this.globaID)
    //   .subscribe((updateTeam) => {});
  }

  getOne() {
    this.currentURL = window.location.href;
    let arrayValues = this.currentURL.split('/');
    const nbaId = arrayValues[4];
    this.nbasDataService.getOne(nbaId).subscribe((nbas) => {});
  }

  mytest = this.nome; //this.nba.name;
}
