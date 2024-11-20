import { Injectable, TemplateRef } from '@angular/core';

import Swal from 'sweetalert2';


@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }


  success(textOrTpl: string | TemplateRef<any>, isOk: any) {

var option ={ classname: 'bg-success text-center text-white', delay: 5000 };
if (isOk!='' )
{
  option ={ classname: 'bg-warning text-center text-white', delay: 5000 };
}

let timerInterval: any;
Swal.fire({
  title: textOrTpl.toString(),
  icon: 'success',
  timer: 5000,
  timerProgressBar: true,
  willClose: () => {
    clearInterval(timerInterval);
  },
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
  }
}); 


    this.toasts.push({ textOrTpl, option });
  }
  

  error(textOrTpl: string | TemplateRef<any>, isOk: any) {
    var option ={ classname: 'bg-war text-center text-white', delay: 5000 };
  
      option ={ classname: 'bg-warning text-center text-white', delay: 5000 };
    
    
let timerInterval: any;
Swal.fire({
  title: textOrTpl.toString(),
  icon: 'warning',
  timer: 5000,
  
  timerProgressBar: true,
  willClose: () => {
    clearInterval(timerInterval);
  },
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
  }
}); 
    
        this.toasts.push({ textOrTpl, option });
      }




  warning(textOrTpl: string | TemplateRef<any>, isOk: any) {
    var option ={ classname: 'bg-success text-center text-white', delay: 5000 };
  
      option ={ classname: 'bg-warning text-center text-white', delay: 5000 };
    
    
let timerInterval: any;
Swal.fire({
  title: textOrTpl.toString(),
  icon: 'warning',
  timer: 5000,
  
  timerProgressBar: true,
  willClose: () => {
    clearInterval(timerInterval);
  },
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
  }
}); 
    
        this.toasts.push({ textOrTpl, option });
      }
      

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
