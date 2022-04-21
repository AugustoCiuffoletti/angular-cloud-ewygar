import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html"
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

  remove(query:string) {
    const xhttp = new XMLHttpRequest();
    let message: string;
    console.log(query);
    try {
      xhttp.onload = function () {
        console.log(this.responseText);
      };
      xhttp.open(
        'GET',
        `https://data.mongodb-api.com/app/underlandscape-app-fwkpt/endpoint/remove?secret=czYZJvY2&source=${query}`,
        false
      );
      xhttp.setRequestHeader('Content-type', 'application/json');
      xhttp.send();
    } catch (e) {
      console.error(e);
      message = e;
      throw e;
    }
    document.getElementById('removeOutput').innerHTML = message;
  };
}
