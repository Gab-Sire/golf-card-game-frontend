import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendPlayerService } from '../service/backend-player.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: FormControl;

  constructor(private backendPlayer: BackendPlayerService, private router: Router) { }

  ngOnInit(): void {
    this.username = new FormControl('');
    this.username.setValidators([Validators.required,
    Validators.minLength(3),
    Validators.maxLength(35)]);
  }

  public addPlayerToQueue() {
    this.backendPlayer.addPlayerToQueue(this.username.value);
    this.joinPlayerLobby();
  }

  public joinPlayerLobby() {
    this.router.navigateByUrl('/lobby').then(
      () => console.log("Successfully transferred to lobby")
    );
  }
}
