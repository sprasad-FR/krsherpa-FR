/**
 * This file contains authentication parameters. Contents of this file
 * is roughly the same across other MSAL.js libraries. These parameters
 * are used to initialize Angular and MSAL Angular configurations in
 * in app.module.ts file.
 */

import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig: Configuration = {
    auth: {
        clientId: '5793930f-c2a4-4d7d-87aa-74697faf522a', // This is the ONLY mandatory field that you need to supply.
        authority: 'https://login.microsoftonline.com/baf0b2ab-b039-493b-a126-df84a4c2d7d5',   //KuV8Q~CgvMkFSn4yLO.6LaqmZplV1.gsOHQ1OabW', // Defaults to "https://login.microsoftonline.com/common"
   // redirectUri: 'http://localhost:4200/events/event-details', // Points to window.location.origin. You must register this URI on Azure portal/App Registration.
    redirectUri:'https://krsherpa.com/events/event-details',//'https://dev.krsherpa.com/events',  //'http://13.126.200.33/', //'http://localhost:4200/',
    //  postLogoutRedirectUri: window.location.origin,
     // navigateToLoginRequestUrl: false,

    },
    cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback(logLevel: LogLevel, message: string) {
                console.log(message);
            },
            logLevel: LogLevel.Verbose,
            piiLoggingEnabled: false
        }
    }
}

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
    graphMe: {
        endpoint: "https://graph.microsoft.com/v1.0/me",
        scopes: ["User.Read","Calendars.ReadWrite"],
    },
    armTenants: {
        endpoint: "https://management.azure.com/tenants",
        scopes: ["https://management.azure.com/user_impersonation"],
    }
}

/**   scopes: ["User.Read","Calendar.Read","Calendar.Write",],
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
 export const loginRequest = {
    scopes: ["User.Read"]
};