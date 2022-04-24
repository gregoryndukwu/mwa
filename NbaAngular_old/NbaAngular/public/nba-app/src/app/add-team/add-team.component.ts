import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbaDataService } from '../nbas-data.service';
import { Coaches, Nba } from '../nbas/nbas.component';
@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css'],
})
export class AddTeamComponent implements OnInit {
  addForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private nbaService: NbaDataService
  ) {
    this.addForm = formBuilder.group({
      name: '',
      championships: 0,
      namecoache: '',
      position: '',
    });
  }
  nbas: Nba[] = [];

  ngOnInit(): void {}

  getNbas() {
    this.nbaService.getNbas().subscribe((nbas) => {
      console.log(nbas);
      this.nbas = nbas;
    });
  }

  onSubmit(): void {
    console.log('This is onSubmit');
    const formData = this.addForm.value;
    // let myNba: Nba = new Nba('Yu', '9', 'kklnk');
    let myNba: Nba = new Nba(
      this.addForm.value.name,
      this.addForm.value.championships
      // [new Coaches(this.addForm.value.namecoache, this.addForm.value.position)]
    );

    console.log(myNba);

    this.nbaService
      .addOne(myNba)
      .subscribe((output: any) => console.log('Succedd', output));
    alert(myNba.name + '' + 'NBA Team Added');
    window.location.href = 'http://localhost:4200/nba';
  }
}
