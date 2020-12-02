import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Player from '../model/player'
import { Observable, Subject, Subscriber } from 'rxjs';

const server_url: string = 'http://localhost:3000/';
const addPlayerToQueueUri: string = "add-player-to-queue";
const getQueuedPlayerList: string = "queued-players-list"
const getGamePlayerList: string = "ingame-players-list"
const MIN_PLAYERS: number = 2;

@Injectable({
  providedIn: 'root'
})
export class BackendPlayerService {

  clientPlayer: Player;
  shouldPollPlayers: boolean;

  constructor(private client: HttpClient) {
  }

  public addPlayerToQueue(username: string) {
    let player: Player = new Player();
    player.name = username;

    this.client.post(server_url + addPlayerToQueueUri, player).subscribe((data) => {
      console.log("Successfully added player to queue");
      this.clientPlayer = player;
    }, err => {
      console.log("Problem while adding player to queue: ", err)
    });
  }

  public getQueuedPlayers() {
    return this.client.get(server_url + getQueuedPlayerList, { observe: 'response' });
  }

  public getGamePlayers(): Player[] {
    this.client.get(server_url + getGamePlayerList).subscribe(data => {
      return data;
    }, err => {
      console.log("Problem while getting ingame players list: ", err);
    });
    return [];
  }

  public updateClientPlayer() {

  }

  public checkIfPlayersAreReady() {
    // //let queuedPlayers: Player[] = this.getQueuedPlayers();

    // if(queuedPlayers.length >= MIN_PLAYERS){
    //   queuedPlayers.forEach(player => {
    //     if(!player.isReadyToPlay){
    //         return false;
    //     }
    //   });
    // }
    // return true;
  }
}