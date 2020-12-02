import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { startWith, switchMap, takeUntil, tap } from 'rxjs/operators'
import Player from '../model/player'
import { BackendPlayerService } from '../service/backend-player.service';

const POLLING_INTERVAL: number = 3000;

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  players$: Observable<any> = new Observable();
  players: any;
  subscription: Subscription;

  constructor(private backendPlayer: BackendPlayerService, private router: Router) {
  }

  ngOnInit(): void {
    this.pollPlayers();
  }

  pollPlayers() {
    console.log("Polling payers:");
    this.subscription = interval(3000).pipe(
      startWith(0),
      switchMap(() => this.backendPlayer.getQueuedPlayers()),
      tap(res => console.log("Response: " + res.body))
    ).subscribe(res => this.players = res.body, 
      err => console.log("Http error: ", err));
  }

  public joinGame(){
    this.router.navigateByUrl('/game').then(
      () => console.log("Successfully transferred to game")
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
