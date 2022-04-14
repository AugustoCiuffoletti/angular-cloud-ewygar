import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

(window as any).global = window;

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  private auth0 = new auth0.WebAuth({
    clientID: environment.auth.clientID,
    domain: environment.auth.domain,
    responseType: 'id_token token',
    redirectUri: environment.auth.redirect,
  });

  private loggedInKey = 'isLoggedIn';

  // Store authentication data
  tokenData$ = new BehaviorSubject(null);
  userProfile$ = new BehaviorSubject(null);

  // Authentication Navigation
  onAuthSuccessURL = '/';
  returnURL = 'https://angular-cloud-ewygar.stackblitz.io';
  onAuthFailureURL = '/';

  constructor(private router: Router) {}

  refreshAuthData() {
    if (this.isLoggedIn()) {
      this.checkSession()
        .then(this.saveAuthData)
        .catch((err) => {
          localStorage.removeItem(this.loggedInKey);
          this.router.navigate([this.onAuthFailureURL]);
        });
    }
  }

  login = () => this.auth0.authorize();

  logout = () => {
    localStorage.setItem(this.loggedInKey, JSON.stringify(false));

    this.auth0.logout({
      returnTo: this.returnURL,
      clientID: environment.auth.clientID,
    });
  };

  isLoggedIn = (): boolean =>
    JSON.parse(localStorage.getItem(this.loggedInKey));

  handleLoginCallback = () => {
    if (window.location.hash && !this.isLoggedIn()) {
      this.parseHash()
        .then((authResult) => {
          this.saveAuthData(authResult);

          window.location.hash = '';

          this.router.navigate([this.onAuthSuccessURL]);
        })
        .catch(this.handleError);
    }
  };

  private parseHash = (): Promise<any> => {
    return new Promise((resolve, reject) =>
      this.auth0.parseHash((err, authResult) => {
        authResult && authResult.accessToken
          ? resolve(authResult)
          : reject(err);
      })
    );
  };

  private saveAuthData = (authResult) => {
    // Save authentication data and update login status subject

    localStorage.setItem(this.loggedInKey, JSON.stringify(true));

    this.tokenData$.next({
      expiresAt: authResult.expiresIn * 1000 + Date.now(),
      accessToken: authResult.accessToken,
    });
    this.userProfile$.next(authResult.idTokenPayload);
  };

  private checkSession = (): Promise<any> =>
    new Promise((resolve, reject) =>
      this.auth0.checkSession({}, (err, authResult) => {
        authResult && authResult.accessToken
          ? resolve(authResult)
          : reject(err);
      })
    );

  // Utility functions

  handleError = (err) => {
    if (err.error_description) {
      console.error(`Error: ${err.error_description}`);
    } else {
      console.error(`Error: ${JSON.stringify(err)}`);
    }
  };
}
