import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { GamesComponent } from './games/games.component';
import { RouterModule } from '@angular/router';
import { AddGamesComponent } from './add-games/add-games.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    GameComponent,
    GamesComponent,
    AddGamesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'games',
        component: GamesComponent,
      },
      {
        path: 'games/:gameId',
        component: GameComponent,
      },
      {
        path: 'games/:gameId',
        component: GameComponent,
      },
      {
        path: 'addOne',
        component: AddGamesComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
