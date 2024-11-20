import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterTable } from './filterModel';
import { stageStatus } from '../../pages/sales/options';
import { Stages } from '../../pages/sales/default.model';

@Component({
  selector: 'app-table-filters',
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.scss'],
})
export class TableFiltersComponent implements OnInit {
  filterForm: FormGroup;
  stageStatus: Stages[];

  // Input for sort by option
  @Input() sortBy: any = [
    {
      id: 0,
      name: 'Latest First',
    },
    {
      id: 1,
      name: 'Oldest First',
    },
    {
      id: 2,
      name: 'Last Updated',
    },
  ];

  // Input for assignable users
  @Input() assignedTo: any;

  @Input() isSearchable: boolean = true;

  @Input() searchModel: any;

  @Input() salesOwnerArray: any;

  // Send event for search field
  @Output()
  ngFilter: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      searchTicket: ['', null],
      sort_by: ['', null],
      managed_by: ['', null],
      salesOwner: ['', null],
      stageStatus: ['', null],
    });
    this._fetchData();
  }
  async _fetchData() {
    this.stageStatus = stageStatus;
  }

  // Notify Subscriber for event handling
  onSearch(model: object) {
    this.ngFilter.emit(this.filterForm);
  }
  filterChanged() {
    this.ngFilter.emit(this.filterForm.value);
  }
}
