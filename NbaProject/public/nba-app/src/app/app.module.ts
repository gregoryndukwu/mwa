import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

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
import { RegisterComponent } from './register/register.component';
import { UpdateAllComponent } from './update-all/update-all.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';

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
    RegisterComponent,
    UpdateAllComponent,
    LoginComponent,
    UsersComponent,
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
      {
        path: 'updateAll/:nbaId',
        component: UpdateAllComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ]),
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
