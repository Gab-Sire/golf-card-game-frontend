import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Player from './player'

const server_url: string = 'http://localhost:3000/';
const addPlayerToQueueUri: string = "add-player-to-queue";
const getQueuedPlayerList: string = "queued-players-list"

@Injectable({
  providedIn: 'root'
})
export class BackendPlayerService {

  constructor(private client: HttpClient) {

  }

  public addPlayerToQueue(username: string) {
    let player: Player = new Player();
    player.name = username;

    this.client.post(server_url + addPlayerToQueueUri, player).subscribe((data) => {
      console.log("Successfully added player to queue");
    }, err => {
      console.log("Problem while adding player to queue: ", err)
    });
  }

  public getQueuedPlayers() {
    this.client.get(server_url + getQueuedPlayerList).subscribe(data => {
      console.log("frontend received player: ", data);
    });
  }
}