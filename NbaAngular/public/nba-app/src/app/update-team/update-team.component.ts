import { Component, OnInit } from '@angular/core';
import { NbaDataService } from '../nbas-data.service';
import { Nba } from '../nbas/nbas.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.css'],
})
export class UpdateTeamComponent implements OnInit {
  addForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private nbasDataService: NbaDataService
  ) {
    /*
    this.addForm = formBuilder.group({
      name: '',
      championships: 0,
      namecoache: '',
      position: '', */
  } //);

  nbas: Nba[] = [];
  currentURL = '';

  ngOnInit(): void {
    this.getOne();
    // this.formBuilder.group.name('teste');
    // this.addForm.value.name('bega');
  }

  onSubmit(): void {}

  getOne() {
    this.currentURL = window.location.href;
    let arrayValues = this.currentURL.split('/');
    const nbaId = arrayValues[4];
    console.log(nbaId);
    this.nbasDataService.getOne(nbaId).subscribe((nbas) => {});
  }
}
