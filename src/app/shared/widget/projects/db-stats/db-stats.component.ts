import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-db-stats',
  templateUrl: './db-stats.component.html',
  styleUrls: ['./db-stats.component.scss']
})

/**
 * Active Project Component
 */
export class DbStatsComponent implements OnInit {

  // Upcoming Activities

  @Input() title: string | undefined;
  @Input() value: any | undefined;
  @Input() icon: string | undefined;
  @Input() persantage: string | undefined;
  @Input() profit: string | undefined;
  @Input() month: string | undefined;
  @Input() type: string | undefined;

  @Input() title1: string | undefined;
  @Input() text1: string | undefined;
  @Input() value1: string | undefined;

  @Input() title2: string | undefined;
  @Input() text2: string | undefined;
  @Input() value2: string | undefined;

  @Input() title3: string | undefined;
  @Input() text3: string | undefined;
  @Input() value3: string | undefined;

  @Input() title4: string | undefined;
  @Input() text4: string | undefined;
  @Input() value4: string | undefined;

  @Input() bgclr: string | undefined;


  
  @Input() ActiveProjects: Array<{
    Pname?: string;
    profile?: string;
    Uname?: string;
    progress?: any;
    assignee: Array<{
      profile?: string;
    }>;
    status?: string;
    date?: string;
  }> | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
