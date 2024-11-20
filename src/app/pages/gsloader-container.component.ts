import {Component,OnInit, TemplateRef} from '@angular/core';

import {GSloaderService} from './gsloader-service';


@Component({
  selector: 'app-gsloader',
  template: "<div class='loader'> <div class='spinner'></div></div>",
 styles: [`.loader { 
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #ffffff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`]

})

export class GSLoaderContainer {
  constructor(public toastService: GSloaderService) {}
 

  
}
