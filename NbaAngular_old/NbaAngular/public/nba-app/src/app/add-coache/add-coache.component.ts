import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbaDataService } from '../nbas-data.service';
import { Coaches, Nba } from '../nbas/nbas.component';

@Component({
  selector: 'app-add-coache',
  templateUrl: './add-coache.component.html',
  styleUrls: ['./add-coache.component.css'],
})
export class AddCoacheComponent implements OnInit {
  currentURL = '';

  addForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private nbaService: NbaDataService
  ) {
    this.addForm = formBuilder.group({
      namecoache: '',
      position: '',
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.currentURL = window.location.href;
    let arrayValues = this.currentURL.split('/');
    const nbaId = arrayValues[4];
    let myCoache: Coaches = new Coaches(
      '',
      this.addForm.value.namecoache,
      this.addForm.value.position
    );

    console.log(myCoache);

    this.nbaService
      .addCoache(myCoache, nbaId)
      .subscribe((output: any) => console.log('Succedd', output));
    alert('Coache Added');
    this.addForm.value.namecoache = '';
    this.addForm.value.position = '';
  }
}
