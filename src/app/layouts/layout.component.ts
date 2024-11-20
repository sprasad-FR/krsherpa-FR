import { Component, OnInit } from '@angular/core';

import { JSEventService } from '../core/services/jsevent.service';
import {
  LAYOUT_VERTICAL, LAYOUT_HORIZONTAL, LAYOUT_TWOCOLUMN, LAYOUT_MODE, LAYOUT_WIDTH,
  LAYOUT_POSITION, SIDEBAR_SIZE, SIDEBAR_COLOR, TOPBAR
} from './layout.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

/**
 * Layout Component
 */
export class LayoutComponent implements OnInit {

  layoutType!: string;

  constructor(private eventService: JSEventService) { }

  ngOnInit(): void {
    this.layoutType = LAYOUT_HORIZONTAL;   // LAYOUT_HORIZONTAL;  //LAYOUT_VERTICAL

    //this.layoutType =                                                                                                                                                                   LAYOUT_VERTICAL

     // listen to event and change the layout, theme, etc
     this.eventService.subscribe('changeLayout', (layout) => {
      this.layoutType = layout;
    });
    
  }

  /**
  * Check if the vertical layout is requested
  */                                                                                                                                            
   isVerticalLayoutRequested() {
    return this.layoutType === LAYOUT_VERTICAL;
  }

  /**
   * Check if the horizontal layout is requested
   */
   isHorizontalLayoutRequested() {
    return this.layoutType === LAYOUT_HORIZONTAL;
  }

  /**
   * Check if the horizontal layout is requested
   */
   isTwoColumnLayoutRequested() {
    return this.layoutType === LAYOUT_TWOCOLUMN;
  }

}
