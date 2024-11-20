import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalenderService {
  constructor(private httpclient: HttpClient) {}
  calendarInvite(postData: any) {
    return this.httpclient.post('https://knowledgeridge-ams.com/api/SHERPAEvents', postData);
  }
}
