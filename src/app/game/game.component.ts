import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Card from '../model/card';
import { BackendGameService } from '../service/backend-game.service';

const faceDownCardImg = "card_cover.png";
const blankCardImg = "card_blank.png";
const faceDownCard = new Card(faceDownCardImg, 0);

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  currentDeckCard: Card;
  currentGraveyardCard: Card;
  currentPlayerCards: Card[];
  subscriptions: Subscription[] = new Array();
  selectedCard: Card;
  gameIsInitialized: boolean = false;

  constructor(private backendGame: BackendGameService) { }

  ngOnInit(): void {
    if (!this.gameIsInitialized) {
      this.backendGame.initializeGame().subscribe(res => {
        console.log("Game initialized")
      }, err => console.log("Http error: ", err));
      this.gameIsInitialized = true;
    }
    this.currentDeckCard = faceDownCard;
    this.currentPlayerCards = [faceDownCard, faceDownCard, faceDownCard, faceDownCard, faceDownCard, faceDownCard, faceDownCard, faceDownCard, faceDownCard];
    this.currentGraveyardCard = new Card("card_blank.png", 0);
    this.selectedCard = null;
  }

  drawDeck() {
    //console.log("Drawing deck");
    this.subscriptions.push(this.backendGame.drawDeck().subscribe((res: Card) => {
      this.currentDeckCard = res; //console.log("card from subscribing to the observable: ", this.currentDeckCard);
    }, err => {
      console.log("Http error: ", err);
    }));
  }

  clickOnCard(idx: number) {
    //console.log("Clicking on card: ", idx);

    if (this.isAFacedownCard(this.currentPlayerCards[idx])) {
      //console.log("Flipping card: ", idx);
      this.subscriptions.push(this.backendGame.flipCard(idx).subscribe((res: Card) => {
        //console.log("Returned card:" + res);
        this.currentPlayerCards[idx] = res;
      }, err => {
        console.log("Http error: ", err);
      }));
    }
    if (this.selectedCard != null) {
      console.log("Moving card " + this.selectedCard.imgName + " to spot of " + this.currentPlayerCards[idx].imgName);
      this.subscriptions.push(this.backendGame.updatePlayerCard(this.selectedCard, idx).subscribe((res: Card) => {

        /* check whether the previous selected card is from deck or graveyard
         * if from deck -> 1) add replaced card to the graveyard 
         *                 2) update player's card with selected from top deck 
         *                 3) deck image is facedown again
         * if from graveyard, swap cards -> 1) update graveyard top card with player's card 
         *                                  2) update player's card with selected from graveyard
         */
        if (this.selectedCard === this.currentDeckCard) {
          this.subscriptions.push(this.backendGame.addToGraveyard(this.currentPlayerCards[idx]).subscribe((graveyardTopCard: Card) => {
            console.log("Retrieving new graveyard top card after adding: ", graveyardTopCard);
            this.currentGraveyardCard = graveyardTopCard;
          }, err => {
            console.log("Http error: ", err);
          }));
          this.currentPlayerCards[idx] = res;
          this.currentDeckCard = faceDownCard;
        } else if (this.selectedCard === this.currentGraveyardCard) {
          this.subscriptions.push(this.backendGame.updateGraveyardTopCard(this.currentPlayerCards[idx]).subscribe((graveyardTopCard: Card) => {
            console.log("Retrieving new graveyard top card after updating: ", graveyardTopCard);
            this.currentGraveyardCard = graveyardTopCard;
          }, err => {
            console.log("Http error: ", err);
          }));
          this.currentPlayerCards[idx] = res;
        }
        this.selectedCard = null;
      }, err => {
        console.log("Http error: ", err);
      }));
    }
  }

  clickOnDeckCard() {
    console.log("Clicking on deck card: ", this.currentDeckCard);
    if (!this.isAFacedownCard(this.currentDeckCard)) {
      this.selectedCard = this.currentDeckCard;
    }
  }

  clickOnGraveyardCard() {
    // case of player burning uncovered top deck card into the graveyard
    if (this.selectedCard === this.currentDeckCard) {
      this.subscriptions.push(this.backendGame.addToGraveyard(this.currentDeckCard).subscribe((graveyardTopCard: Card) => {
        console.log("Retrieving new graveyard top card after adding: ", graveyardTopCard);
        this.currentGraveyardCard = graveyardTopCard;
      }, err => {
        console.log("Http error: ", err);
      }));
      this.currentDeckCard = faceDownCard;
      this.selectedCard = null;
      return;
    }
    console.log("Clicking on graveyard card: ", this.currentGraveyardCard);
    if (this.currentDeckCard.imgName !== blankCardImg) {
      this.selectedCard = this.currentGraveyardCard;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private isAFacedownCard(card: Card): boolean {
    return card.imgName === faceDownCardImg;
  }

}
