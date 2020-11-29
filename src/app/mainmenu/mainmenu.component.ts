import { Component, OnInit } from '@angular/core';
import { BackendPlayerService } from '../backend-player.service'
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainMenuComponent implements OnInit {

  username: FormControl;

  constructor(private backend: BackendPlayerService) { }

  ngOnInit(): void {
    this.username = new FormControl('');
    this.username.setValidators([Validators.required,
    Validators.minLength(3),
    Validators.maxLength(35)]);
  }

  public addPlayerToQueue() {
    this.backend.addPlayerToQueue(this.username.value);
  }
}
