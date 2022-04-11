import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Nba } from '../nbas/nbas.component';
import { NbaDataService } from '../nbas-data.service';

@Component({
  selector: 'app-nba',
  templateUrl: './nba.component.html',
  styleUrls: ['./nba.component.css'],
})
export class NbaComponent implements OnInit {
  nba!: Nba;
  addCoache: string | undefined;
  constructor(
    private route: ActivatedRoute,
    private nbasDataService: NbaDataService
  ) {}

  ngOnInit(): void {
    console.log('I am Here');
    const nbaId = this.route.snapshot.params['nbaId'];
    this.nbasDataService.getOne(nbaId).subscribe((nba) => {
      this.nba = nba;
      // console.log(nba);
      // console.log(nba.coaches);

      console.log(nba);
      //   console.log(nba.name, nba.Championships, nba.coaches);
      console.log(
        this.nba.name,
        this.nba.Championships
        //  this.nba.coaches[0].name
      );
    });
    /*
    addCoache(nbaId: string) {
    this.nbasDataService.addCoache(nbaId).subscribe((result) => {
      console.log(result);
      console.log('Coache Adde !');
    });
  } */
  }
  deleteCoache(coacheId: string, nbaId: string) {
    this.nbasDataService.deleteCoache(coacheId, nbaId).subscribe((result) => {
      console.log(result);
      console.log('COACHE DELETED !');
      document.location.reload();
    });
  }
}
