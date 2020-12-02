import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { LoginComponent } from './login/login.component'
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LobbyComponent as LobbyComponent } from './lobby/lobby.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'lobby', component: LobbyComponent },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    LoginComponent,
    LobbyComponent,
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
