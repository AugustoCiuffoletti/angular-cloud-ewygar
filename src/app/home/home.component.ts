import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html"
})
export class HomeComponent {
  url;

  constructor(public authService: AuthService) {
    this.url = window.location.href;
  }

  signup() {
    window.open(
      "https://auth0.com/signup?utm_source=stackblitz&utm_medium=devsponsor&utm_campaign=stackblitz-angular",
      "_blank"
    );
  }
}
