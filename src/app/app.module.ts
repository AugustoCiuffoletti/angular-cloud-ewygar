import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AccountComponent } from "./account/account.component";
import { CallbackComponent } from "./callback/callback.component";

import { AuthService } from "./auth/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    CallbackComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
