import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Logger } from '../logger.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
//const log = new Logger('HttpDispatcherService');
//  var headerToken = {'Authorization': `Bearer `+ sessionStorage.getItem('token')};    
//return this.http.get(GlobalComponent.API_URL + GlobalComponent.product, {  headers: headerToken, responseType: 'text' });
//const crypto = require('crypto');
//const base64 = require('base64url');



//import { getSignature, getSignatureData } from "./utils";




//import { crypto } from 'crypto';
//import { crypto, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpDispatcherService {

   requestOptions:any;
   headers:any;
  constructor(private  httpClient: HttpClient,private router: Router,) {

 




  this.requestOptions = { headers: this.headers };
  this.httpClient.options= this.requestOptions;
  }


  
  get<T>(url: string): Observable<T> {
    console.log('in httpClient');
   // debugger
   url=environment.serverUrl +url;
    this.headers = new HttpHeaders({

      'Content-Type': 'application/json',

      'Authorization': `Bearer `+ localStorage.getItem('token')

    });

    return this.httpClient.get<T>(url,
      { headers: this.headers }).pipe(
      map((response) => {
        return response; //response['error'] && response['error']['statusCode'] != 200 ? response['error']['message'] : response;
      }),
      tap((item) => {
        if (item) {
          return item;
        }
        return item;
      }),
      catchError(this.handleError)
    );
  }

  post<T>(url: string, body: any): Observable<T> {
    url=environment.serverUrl +url;

    this.headers = new HttpHeaders({

      'Content-Type': 'application/json',

      'Authorization': `Bearer `+ localStorage.getItem('token')

    });


    return this.httpClient.post<T>(url, body,{ headers: this.headers }).pipe(
      tap((responseData: any) => {
        return responseData;
      }),
      catchError(this.handleError)
    );
  }




  
  //console.log('x:', x);
  /*
   getSignature(networkHeaders) {
    const signatureData = networkHeaders.body + networkHeaders.timestamp;
    const hmac = crypto.createHmac('sha256', networkHeaders.signingKey);
    hmac.update(signatureData);
    const signature = hmac.digest('hex');
    return signature.toLowerCase();
  }

*/



  postmiddlexx<T>(url: string, body: any): Observable<T> {
/*
   // console.log('payload:', str);
    const str = JSON.stringify(data);
    //const body = Buffer.from(str);

    const body = Buffer.from(str); //, 'utf-8'

    console.log('payload:', body);
    //const Uint8Array1 = new Uint8Array(body)

    //const base64: string = btoa( Uint8Array1);

    const payloadEnc: string = base64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');


   // const payloadEnc = base64url(Uint8Array1);
    //const payloadEnc = base64url.(body);
    console.log('payload:', payloadEnc);
    
    const signx = this.getSignature({
      slug: 'knowledge_ridge_v2',
      signingKey: 'r9za0w7ycdoq4ipu8lv5bshtjgm2x1e63knf0',
      timestamp: this.gettimestamp(),
      body: payloadEnc
    });
/* */

    
    url='https://ens-webhooks-proxy.beta.mckinsey.digital/api/external/v2' +url;   //getlinks

 /*  this.headers = new HttpHeaders({ve
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods":"GET,HEAD,OPTIONS,POST,PUT",
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    //  'Authorization': `Bearer `+ localStorage.getItem('token')

    });  */


   // let signature=  this.getSignature(this.getSignatureData(JSON.stringify(body), this.gettimestamp()), this.key);
    
    // old this.generateSignature(this.key, JSON.stringify(body),this.gettimestamp().toString())
    
    //const signature = this.generateSignature(signingKey, requestBody, timestamp);


//console.log(signature.toString())

const message = body;
// const path = 'any-slug-here'
const key = "r9za0w7ycdoq4ipu8lv5bshtjgm2x1e63knf0";
const timestamp = Date.now();
/*
const signature = getSignature(
  getSignatureData(JSON.stringify(message), timestamp),
  key
); */

const signature ="";

console.log(timestamp, signature);


    this.headers= {
     // "Access-Control-Allow-Credentials": "true",
      //"Access-Control-Allow-Methods":"GET,HEAD,OPTIONS,POST,PUT",
     
      "X-ENS-API-SLUG": 'knowledge_ridge_v2',
      "X-ENS-API-TIMESTAMP": timestamp,
      "X-ENS-API-SIGNATURE": signature,
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json',      

    }






console.log(this.headers)

  //  response.setHeader("Access-Control-Allow-Origin", "*");
  //  response.setHeader("Access-Control-Allow-Credentials", "true");
   // response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
 //   response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");


    return this.httpClient.post<T>(url, body, { headers: this.headers }).pipe(
      tap((responseData: any) => {
        console.log('responseData',responseData);


        return responseData.result;
      }),
      catchError(this.handleError)
    );
  }




/*
  generateSignature(signingKey: string, requestBody: string, timestamp: string): string {
    const encodedBody = enc.Base64.stringify(enc.Utf8.parse(requestBody));
    const concatenated = encodedBody + timestamp;
    const hmac = HmacSHA256(concatenated, signingKey);
    const hexDigest = hmac.toString(encHex);
    return hexDigest.toLowerCase();
  }




  gettimestamp() {
    return  Date.now();
  }

  base16Encode(str) {
    let encoded = "";
    for (let i = 0; i < str.length; i++) {
      const hex = str.charCodeAt(i).toString(16);
      encoded += hex.padStart(2, "0");
    }
    return encoded;
  }


   encodeBase641(str) {
    return btoa(str);
  }
  
   encodeBase64(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    let base64 = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let padding = 0;
    let bits = 0;
    for (let i = 0; i < data.length; i++) {
      bits = (bits << 8) | data[i];
      padding += 8;
      while (padding >= 6) {
        padding -= 6;
        const index = (bits >> padding) & 0x3F;
        base64 += characters[index];
      }
    }
    if (padding > 0) {
      bits <<= 6 - padding;
      const index = bits & 0x3F;
      base64 += characters[index];
    }
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }
    return base64;
  }


  // Helper function to encode a string to base16 (hex)
   encodeBase16(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      let hex = str.charCodeAt(i).toString(16);
      result += hex.length === 1 ? '0' + hex : hex;
    }
    return result;
  }
  
  // Helper function to calculate the SHA-256 HMAC
   sha256HMAC(key, data) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const cryptoKey = encoder.encode(key);
    const cryptoData = encoder.encode(data);
    return crypto.subtle.importKey('raw', cryptoKey, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
      .then(key => crypto.subtle.sign('HMAC', key, cryptoData))
      .then(signature => {
        const signatureArray = Array.from(new Uint8Array(signature));
        const signatureHex = signatureArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return signatureHex;
      })
      .then(hex => decoder.decode(new Uint8Array(hex.match(/[\da-f]{2}/gi).map(h => parseInt(h, 16)))));
  }
  
  // Main function to execute the logic
  getSigned(signingKey, requestBody, timestamp) {
    const encodedBody = this.base16Encode(requestBody);
    const concatenatedData = encodedBody + timestamp;
    return this.sha256HMAC(signingKey, concatenatedData)
      .then(result => this.encodeBase64(result).toLowerCase());
  }



  getsignature(obj) {

// downcase(encode_base16(sha256_hmac(signing_key, concat(encode_base64(request_body), timestamp))))
   
let key="r9za0w7ycdoq4ipu8lv5bshtjgm2x1e63knf0"
return key;

  }
*/


  postmiddle<T>(url: string, body: any): Observable<T> {





    
    url='https://middle.krsherpa.com/mck' +url;   //getlinks

 
 console.log(' in postmiddle',url);

    return this.httpClient.post<T>(url, body).pipe(
      tap((responseData: any) => {
        console.log('responseData',responseData);


        return responseData.result;
      }),
      catchError(this.handleError)
    );






  }



  put<T>(url: string, body: any): Observable<T> {
    url=environment.serverUrl +url;
    this.headers = new HttpHeaders({

      'Content-Type': 'application/json',

      'Authorization': `Bearer `+ localStorage.getItem('token')

    });

    return this.httpClient.put<T>(url, body,{ headers: this.headers }).pipe(
      tap((responseData: any) => {
        return responseData;
      }),
      catchError(this.handleError)
    );
  }

  patch<T>(url: string, body: any): Observable<T> {
    url=environment.serverUrl +url;
    this.headers = new HttpHeaders({

      'Content-Type': 'application/json',

      'Authorization': `Bearer `+ localStorage.getItem('token')

    });

    return this.httpClient.patch<T>(url, body,{ headers: this.headers }).pipe(
      tap((responseData: any) => {
        return responseData;
      }),
      catchError(this.handleError)
    );
  }

  delete<T>(url: string): Observable<T> {
    url=environment.serverUrl +url;
    this.headers = new HttpHeaders({

      'Content-Type': 'application/json',

      'Authorization': `Bearer `+ localStorage.getItem('token')

    });

    return this.httpClient.delete<T>(url,{ headers: this.headers }).pipe(
      tap((responseData: any) => {
        return responseData;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.log('An error occurred (dispatcher):', error);

 if (error.toString().indexOf('jwt')>0)
 {

    localStorage.removeItem('user')
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);

 }

    return throwError(error);

  }
}
