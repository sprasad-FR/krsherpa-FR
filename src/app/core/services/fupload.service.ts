import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import { HttpDispatcherService } from '../http/http-dispatcher.service';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
    
  // API url
 // 19Nov2022 baseApiUrl ='/files'; //'/files'; //'/media/upload';//'http://localhost:4200/' //"https://dev.krsherpa.com/"
 baseApiUrl ='/media/upload'; //'/files'; //'/media/upload';//'http://localhost:4200/' //"https://dev.krsherpa.com/"
 
 
 baseApiUrlRes ='/media/uploadRes'; //'/files'; //'/media/upload';//'http://localhost:4200/' //"https://dev.krsherpa.com/"
 

 baseApiUrlcli ='/media/upload4Client'; //'/files'; //'/media/upload';//'http://localhost:4200/' //"https://dev.krsherpa.com/"
 

 baseApiUrlPrj ='/media/upload4Project'; //'/files'; //'/media/upload';//'http://localhost:4200/' //"https://dev.krsherpa.com/"
 

 baseApiUrlEvents ='/media/upload4Events'; //'/files'; //'/media/upload';//'http://localhost:4200/' //"https://dev.krsherpa.com/"
 





 //constructor(private readonly http: HttpDispatcherService) {}

  constructor(private http:HttpClient) { }
  
  // Returns an observable
  upload(file:any):Observable<any> {
  
      // Create form data
      const formData = new FormData(); 
        
      // Store form name as "file" with file data
      formData.append("file", file, file.name);
     
      // Make http post request over api
      // with formData as req

  return this.http.post(this.baseApiUrl, formData)

    
  }


  // Returns an observable
  dnoad(filename:any):Observable<any> {
  
    // Create form data
    //const formData = new FormData(); 
      
    // Store form name as "file" with file data
    //formData.append("file", file, file.name);
      
    // Make http post request over api
    // with formData as req
    return this.http.get(this.baseApiUrl+"/"+filename)

}


getguid()
{

  return this.CreateGUID();
}


uploadFile(fileName: string, file: File, moduletype:any): Observable<any> {

   let headers1 = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials,content-type=multipart/*'
  
  
  
    })


  var url=environment.serverUrl ;
  let headers = new HttpHeaders({

     'Content-Type': 'application/json',

     'Authorization': `Bearer `+ localStorage.getItem('token'),
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
     'Access-Control-Allow-Headers': 'Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials,content-type=multipart/*'
 
 



   });



  let options = {headers:headers, observer: 'response'};
  const formData: FormData = new FormData();

 // formData.append('fileName', fileName);
  //formData.append('file', file);
  // Store form name as "file" with file data
var guid= this.CreateGUID()

      formData.append("file", file,fileName);
     // formData.append("newnm", this.CreateGUID()); 


console.log (guid)

      if (moduletype=='expert')
      {
       
        const req = new HttpRequest('POST', url+this.baseApiUrlRes+'', formData, {
          reportProgress: false,
          responseType: 'json'
        });
        return this.http.request(req);

      //  return this.http.post(this.baseApiUrlRes, formData)
      }
      else if (moduletype=='client')
      {
       
        const req = new HttpRequest('POST', url+this.baseApiUrlcli+'', formData, {
          reportProgress: false,
          responseType: 'json'
        });
        return this.http.request(req);

      //  return this.http.post(this.baseApiUrlRes, formData)
      }
      else if (moduletype=='project')
      {
       
        const req = new HttpRequest('POST', url+this.baseApiUrlPrj+'', formData, {
          reportProgress: false,
          responseType: 'json'
        });
        return this.http.request(req);

      //  return this.http.post(this.baseApiUrlRes, formData)
      }
     else if (moduletype=='event')
      {
       
        const req = new HttpRequest('POST', url+this.baseApiUrlEvents+'', formData, {
          reportProgress: false,
          responseType: 'json'
        });
        return this.http.request(req);

      //  return this.http.post(this.baseApiUrlRes, formData)
      }
      else{
        const req = new HttpRequest('POST', url+this.baseApiUrl+'', formData, {
          reportProgress: false,
          responseType: 'json'
        });
        return this.http.request(req);       
      
      }




  //console.log(req);


/*
   */

  /*
  const req = new HttpRequest('POST', this.baseApiUrl+'', file, {
    reportProgress: false,
    responseType: 'json'
  });

*/



}

downloadFile(fileName: string): Observable<any> {

  let headers = new HttpHeaders({
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials,content-type=multipart/*'  })


    //     'Access-Control-Allow-Headers': 'Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials,content-type=multipart/*'

 let options = {headers:headers, observer: 'response'};

 //const formData: FormData = new FormData();

// formData.append('fileName', fileName);
 //formData.append('file', file);
 // Store form name as "file" with file data
   //  formData.append("file", file, fileName);
   
 const req = new HttpRequest('GET', this.baseApiUrl+"/"+fileName ,{
  // reportProgress: true,
   responseType: 'blob',
 });

return this.http.request(req);
}



CreateGUID() {
 
  var d = new Date().getTime();//Timestamp
  var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if(d > 0){//Use timestamp until depleted
          r = (d + r)%16 | 0;
          d = Math.floor(d/16);
      } else {//Use microseconds since page-load if supported
          r = (d2 + r)%16 | 0;
          d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });


}



}