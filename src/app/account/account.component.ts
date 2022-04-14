import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-account",
  template: `
    <section *ngIf="profile" class="jumbotron">
      <h2><img src="{{profile.picture}}" alt="Jumbotron image"/></h2>
      <h1>{{profile.name}}</h1>
      <p>Well done!</p>
      <div class="btn btn-success btn-lg" routerLink="/">Back to Homepage</div>
    </section>
  `
})
export class AccountComponent implements OnInit {
  profile: any;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.userProfile$.subscribe(data => {
      if (data) {
        this.profile = { ...data };
      }
    });
  }
}
