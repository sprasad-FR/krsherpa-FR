// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


import { env } from './.env';

export const environment = {
  production: false,
  hmr: true,
  version: 1.0,   //env.npm_package_version + '-dev',
  serverUrl :'http://[::1]:3000/', 
 //serverUrl :'http://65.1.237.23:3000', 
 // serverUrl: 'https://devapi.krsherpa.com',
 //serverUrl: 'https://api.krsherpa.com',
  //serverUrl: 'https://devapi.krsherpa.com',
  //  'http://3.110.33.151',// 'https://api.krsherpa.com/', //'http://3.110.33.151', //'http://api.krsherpa.com/', //'http://localhost:3000', // '/api'
 // serverUrl :'http://[::1]:3000',  //for local test
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US'],
  defaultauth: 'fackbackend',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  }
};




/*
export const environment = {
  production: false,
  defaultauth: 'fackbackend',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  }
};
*/
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
