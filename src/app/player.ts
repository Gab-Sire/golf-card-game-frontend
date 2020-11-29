import { Card } from './card'

export default class Player {
    name: string;
    isReadyToPlay: boolean;
    score: number;
    cards: Card[];

    constructor(){
        this.name = "";
        this.isReadyToPlay = false;
        this.score = 0;
        this.cards = [];
    }
}