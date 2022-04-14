// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    clientID: 'LounxleZc3pi33bof6U70oqPOBxKwGIW',
    domain: 'dev-cl2h2wo4.eu.auth0.com', // e.g., you.auth0.com
    redirect: 'https://angular-cloud-ewygar.stackblitz.io/callback', // e.g., you.auth0.com
    logout_url: 'https://angular-cloud-ewygar.stackblitz.io'
  },
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
