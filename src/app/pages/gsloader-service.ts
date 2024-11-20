import { Injectable, TemplateRef } from '@angular/core';



@Injectable({ providedIn: 'root' })
export class GSloaderService {
  toasts: any[] = [];


  showLoader = false;



  private loading: boolean = false;

  constructor() { }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }



}
