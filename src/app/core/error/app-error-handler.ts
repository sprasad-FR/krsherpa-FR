import { ErrorHandler, NgZone, Injectable, Injector, Inject } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { AppError } from './app-error';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Logger } from '../logger.service';
import { ToastrService } from 'ngx-toastr';

const log = new Logger('AppErrorHandler');

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  constructor(
    @Inject(Injector) private readonly injector: Injector,
    private ngZone: NgZone,
    private translateService: TranslateService
  ) {}

  handleError(error: HttpErrorResponse): void {
    let message: any = null;

    console.log('-----IN APP ERROR HANDLER Starts------');
    console.error(error);
    console.log('-----IN APP ERROR HANDLER Ends------');

    // tslint:disable:triple-equals
    // if (error instanceof AppError) {
    //   message = error.originalError;
    // } else if (typeof error == 'string') {
    //   message = error;
    // } else if (error && error.status != undefined) {
    //   message = error.status;
    // }
    //  else {
    //   message = 'An unexpected error occured.';
    // }

    message = this.translateService.instant(error.message);

    try {
      this.ngZone.run(() => {
        this.toastrService.error(message, 'Error!', { onActivateTick: true });
      });
    } catch (error) {
      console.log(error);
    }
  }

  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }
}
