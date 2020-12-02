import { Component, OnInit } from '@angular/core';
import Card from '../model/card'
import { BackendCardService  } from '../service/backend-card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
