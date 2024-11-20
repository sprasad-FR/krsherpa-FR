import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {projects} from './projects.model';

export type pSortColumn = keyof projects | '';
export type pSortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: pSortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface PrjSortEvent {
  column: pSortColumn;
  direction: pSortDirection;
}

@Directive({
  selector: 'th[psortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdGridJsPrjSortableHeader {

  @Input() sortable: pSortColumn = '';
  @Input() direction: pSortDirection = '';
  @Output() sort = new EventEmitter<PrjSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}
