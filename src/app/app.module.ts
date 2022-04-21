import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AccountComponent } from "./account/account.component";
import { CallbackComponent } from "./callback/callback.component";

import { AuthService } from "./auth/auth.service";
import { MongoDB } from "./account/mongodb.service";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    CallbackComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [AuthService, MongoDB],
  bootstrap: [AppComponent]
})
export class AppModule {}
