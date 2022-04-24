import { Component, OnInit } from '@angular/core';
import { NbaDataService } from '../nbas-data.service';
@Component({
  selector: 'app-nbas',
  templateUrl: './nbas.component.html',
  styleUrls: ['./nbas.component.css'],
})
export class NbasComponent implements OnInit {
  constructor(private nbasDataService: NbaDataService) {}

  nbas: Nba[] = [];
  ngOnInit(): void {
    this.getNbas();
  }
  getNbas() {
    this.nbasDataService.getNbas().subscribe((nbas) => {
      console.log(nbas);
      this.nbas = nbas;
    });
  }
  deleteNba(nbaId: string) {
    let text = 'Press Ok To confirm \n or Cancel.';
    if (confirm(text) == true) {
      this.nbasDataService.deleteNba(nbaId).subscribe((result) => {
        console.log(result);
        console.log('GAME DELETED !');
        this.getNbas();
      });
    } else {
      text = 'You canceled!';
      this.getNbas();
    }
  }
}

export class Coaches {
  _id!: string;
  name!: string;
  position!: string;

  constructor(id: string, name: string, position?: string) {
    this._id = id;
    this.name = name;
    this.position = position ?? '';
  }
}
export class Nba {
  _id!: string;
  name!: string;
  Championships!: number;
  coaches!: any[];

  constructor(
    name: string,
    Championships: number,
    id?: string,
    coaches?: any[]
  ) {
    this._id = id ?? '';
    this.name = name;
    this.Championships = Championships;
    this.coaches = coaches ?? [];
  }
}
