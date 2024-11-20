/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {projects} from './projects.model';
import {GridJs} from './data';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from './projects-sortable.directive';

interface SearchResult {
  countries: any[];
  clientSentProjects: any[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
}



const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(countries: any[], column: SortColumn, direction: string): any[] {
  if (direction === '' || column === '') {
    return countries;
  } else {
    return [...countries].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(country: projects, term: string, pipe: PipeTransform) {
  if (term && term!='')
  {
  return country.id?.toLowerCase().includes(term?.toLowerCase())
  || country.Client?.toLowerCase().includes(term?.toLowerCase())
  || country.name?.toLowerCase().includes(term?.toLowerCase())
  || country.country?.toLowerCase().includes(term?.toLowerCase())
  || country.industry?.toLowerCase().includes(term?.toLowerCase())
  || country.expertlist?.toLowerCase().includes(term?.toLowerCase())

 // || country.status?.toLowerCase().includes(term.toLowerCase())
  ;
  }
  else{
    return true;;
  }

}






@Injectable({providedIn: 'root'})
export class ProjectsTableService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<projects[]>([]);
  private _clientSentProjects$ = new BehaviorSubject<projects[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 25,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    startIndex: 0,
    endIndex: 9,
    totalRecords: 0
  };
  private employeelist:projects[]=[];


  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._countries$.next(result.countries);

     // this._clientSentProjects$.next(result.countries.filter(country => matches(country, "mckinsey", this.pipe)));
   

      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get countries$() { return this._countries$.asObservable(); }
  get clientSentProjects$() { return this._clientSentProjects$.asObservable(); }

  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  get startIndex() { return this._state.startIndex; }
  get endIndex() { return this._state.endIndex; }
  get totalRecords() { return this._state.totalRecords; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }
  set startIndex(startIndex: number) { this._set({ startIndex }); }
  set endIndex(endIndex: number) { this._set({ endIndex }); }
  set totalRecords(totalRecords: number) { this._set({ totalRecords }); }

  set emps(employeelis:projects[]) { this.employeelist= employeelis; this._search$.next(); }



  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let countries = sort(this.employeelist, sortColumn, sortDirection);

    // 2. filter
    countries = countries.filter(country => matches(country, searchTerm, this.pipe));
    
    let clientSentProjects= countries.filter(country => matches(country, "mckinsey", this.pipe));
    this._clientSentProjects$.next(clientSentProjects)
    const total = countries.length;

    // 3. paginate
    this.totalRecords = countries.length;
    this._state.startIndex = (page - 1) * this.pageSize + 1;
    this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
        this.endIndex = this.totalRecords;
    }
    countries = countries.slice(this._state.startIndex - 1, this._state.endIndex);
    return of({countries,clientSentProjects, total});
  }
}
