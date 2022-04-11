import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NbaComponent } from './nba/nba.component';
import { NbasComponent } from './nbas/nbas.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCoacheComponent } from './add-coache/add-coache.component';
import { UpdateTeamComponent } from './update-team/update-team.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    NbaComponent,
    NbasComponent,
    AddTeamComponent,
    AddCoacheComponent,
    UpdateTeamComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'nba',
        component: NbasComponent,
      },
      {
        path: 'nba/:nbaId',
        component: NbaComponent,
      },
      {
        path: 'addOne',
        component: AddTeamComponent,
      },
      {
        path: 'addCoache/:nbaId',
        component: AddCoacheComponent,
      },
      {
        path: 'deleteCoache/:nbaId',
        component: AddCoacheComponent,
      },
      {
        path: 'updateTeam/:nbaId',
        component: UpdateTeamComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
