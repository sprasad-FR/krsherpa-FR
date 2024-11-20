import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';

export interface FormErrorsComponent {
  innerValidationError: boolean;
  messages: string[];
  params: { [key: string]: any };
}

@Component({
  selector: 'app-custom-form-errors',
  templateUrl: './custom-form-errors.component.html',
  styleUrls: ['./custom-form-errors.component.scss'],
})
export class CustomFormErrorsComponent implements OnInit {
  _text;
  _hide = true;

  @Input() set text(value) {
    // console.log('value', value);
    if (value !== this._text) {
      this._text = value;
      this._hide = !value;
      this.cdr.detectChanges();
      // console.log('Message Added---', this._hide);
    }
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // console.log('CustomFormErrorsComponent', this._text);
  }
}
