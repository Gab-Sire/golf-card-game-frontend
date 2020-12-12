import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Card from '../model/card';

const server_url: string = 'http://localhost:3000';
const initializeGameUri: string = "/initialize-game";
const drawDeckUri: string = "/draw-deck";
const playerCardUri: string = "/player-card/"
const updatePlayerCardUri: string = "/update-player-card/";
const addToGraveyardUri: string = "/add-to-graveyard";
const updateGraveyardCardUri: string = "/update-graveyard-card";

@Injectable({
  providedIn: 'root'
})
export class BackendGameService {

  constructor(private client: HttpClient) {
  }

  public initializeGame() {
    console.log("Calling to initialize game: ")
    return this.client.get(server_url + initializeGameUri);
  }

  public drawDeck() {
    return this.client.get(server_url + drawDeckUri);
  }

  public flipCard(idx: number) {
    console.log(server_url + playerCardUri + idx);
    return this.client.get(server_url + playerCardUri + idx);
  }

  public updatePlayerCard(card: Card, idx: number) {
    console.log(server_url + playerCardUri + idx);
    return this.client.post(server_url + updatePlayerCardUri + idx, card);
  }

  public addToGraveyard(card: Card) {
    console.log(server_url + playerCardUri);
    return this.client.post(server_url + addToGraveyardUri, card);
  }

  public updateGraveyardTopCard(card: Card) {
    console.log(server_url + playerCardUri);
    return this.client.post(server_url + updateGraveyardCardUri, card);
  }
}

