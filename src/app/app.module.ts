import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component'
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LobbyComponent as LobbyComponent } from './lobby/lobby.component';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: 'game', component: GameComponent },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LobbyComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
