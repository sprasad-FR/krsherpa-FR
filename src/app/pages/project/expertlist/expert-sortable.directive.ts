import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {expert} from './expert.model';

export type exSortColumn = keyof expert | '';
export type exSortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: exSortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface exSortEvent {
  column: exSortColumn;
  direction: exSortDirection;
}

@Directive({
  selector: 'th[exsortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdGridJsexSortableHeader {

  @Input() sortable: exSortColumn = '';
  @Input() direction: exSortDirection = '';
  @Output() sort = new EventEmitter<exSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}
