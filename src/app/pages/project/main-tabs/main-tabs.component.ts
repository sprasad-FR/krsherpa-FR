import { Component, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-tabs',
  templateUrl: './main-tabs.component.html',
  styleUrls: ['./main-tabs.component.scss'],
})
export class MainTabsComponent implements OnInit {
  // tabLinks: any = [];

//import { Component, Input, Output, OnInit } from '@angular/core';
@Input() itemid: string='';
@Input() readonly: boolean=true;
  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.tabLinks = [
    //   { title: 'Overview', fragment: 'overview' },
    //   { title: 'Project Flow', fragment: 'projectFlow' },
    //   { title: 'Events', fragment: 'events' },
    //   { title: 'Attachments', fragment: "'attachments'" },
    // ];
  }

  openNewTab(url) {
    window.open(url, '_blank');
  }
}
