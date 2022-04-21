import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MongoDB } from './mongodb.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  profile: any;

  constructor(public authService: AuthService, private db: MongoDB) {}

  ngOnInit() {
    this.authService.userProfile$.subscribe((data) => {
      if (data) {
        this.profile = { ...data };
      }
    });
  }

  remove(query: string) {
    const xhttp = new XMLHttpRequest();
    let message: string;
    console.log(query);
    var obs = this.db.remove(query);
    obs.subscribe({
      next: (responseText: string) => {
        console.log(responseText);
        document.getElementById('removeOutput').innerHTML = responseText;
      },
      error: (e: Error) => {
        console.error(e);
        document.getElementById('removeOutput').innerHTML =  e.message;
        throw e.message;
      }
    });
  }
}
