import { Injectable } from '@angular/core';
import { Card, constructedCards } from './card.pojo';


@Injectable({
  providedIn: 'root'
})
export class CardService { 

  private static cards: Card[] = constructedCards; 
  
 
  constructor() { 
    console.log(CardService.cards[1]);
  }

  

}
