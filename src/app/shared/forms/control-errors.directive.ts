import {
  Directive,
  Optional,
  Inject,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  Host,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { FORM_ERRORS } from './form-errors';
import { merge, EMPTY, Observable } from 'rxjs';
import { CustomFormErrorsComponent } from './custom-form-errors/custom-form-errors.component';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { FormSubmitDirective } from './form-submit.directive';
import { untilDestroyed } from '@app/@core';

@Directive({
  selector: '[formControl], [formControlName]',
})
export class ControlErrorsDirective {
  ref: ComponentRef<CustomFormErrorsComponent>;
  container: ViewContainerRef;
  submit$: Observable<Event>;
  @Input() customErrors = {};

  constructor(
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    @Optional() controlErrorContainer: ControlErrorContainerDirective,
    @Inject(FORM_ERRORS) private errors,
    @Optional() @Host() private form: FormSubmitDirective,
    private controlDir: NgControl
  ) {
    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
  }

  ngOnInit() {
    this.submit$ = this.form ? this.form.submit$ : EMPTY;

    if (this.controlDir.name != null) {
      merge(this.submit$, this.control.valueChanges)
        .pipe(untilDestroyed(this))
        .subscribe((v) => {
          const controlErrors = this.control.errors;

          // console.log({ controlErrors, v });

          if (controlErrors) {
            const firstKey = Object.keys(controlErrors)[0];
            const getError = this.errors[firstKey];
            const text = this.customErrors[firstKey] || getError(controlErrors[firstKey]);
            this.setError(text);
          } else if (this.ref) {
            this.setError(null);
          }
        });
    }
  }

  get control() {
    return this.controlDir.control;
  }

  setError(text: string) {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(CustomFormErrorsComponent);
      this.ref = this.container.createComponent(factory);
    }

    this.ref.instance.text = text;
  }

  ngOnDestroy() {}
}
