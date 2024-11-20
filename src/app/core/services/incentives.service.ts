import { EmployeeService } from './employee.service';
import { Injectable } from '@angular/core';
import { HttpDispatcherService } from '../http/http-dispatcher.service';


import { Observable } from 'rxjs';
import { Incentives } from '../models/incentive.model';

const routes = {
  events: {
    getAll: (filters?: Map<string, any>) =>
      filters ? `/research-incentives?${filters.toSanitizedURLFilters()}` : `/research-incentives`,
    get: (id: string, filters?: Map<string, any>) =>
      filters ? `/research-incentives/${id}?${filters.toSanitizedURLFilters()}` : `/research-incentives/${id}`,
    create: () => `/research-incentives`,
    update: (id: string) => `/research-incentives/${id}`,
    delete: (id: string) => `/research-incentives/${id}`,
    updateOnly: (id: string) => `/research-incentives/${id}`,
  },
};

@Injectable({
  providedIn: 'root',
})
export class IncentivesService {
  constructor(private httpDispatcher: HttpDispatcherService

 
    ) {}

  // Get list of all available event
  getAll(filters?: Map<string, any>): Observable<Incentives[]> {
    return this.httpDispatcher.get<Incentives[]>(routes.events.getAll(filters));
  }

  // Get only selected event
  show(id: string, filters?: Map<string, any>): Observable<Incentives> {
    return this.httpDispatcher.get<Incentives>(routes.events.get(id, filters));
  }

  GetIncentiveForMonth(id: string, month: number, year: number) {
    const filters = new Map();
    const filter = {
      where: {
        and: [
          { date: { lt: year + '-' + month + '-31' } },
          { date: { gt: year + '-' + month + '-01' } },
          { Userid: id },
        ],
      },
    };

    filters.set('filter', JSON.stringify(filter));
    return this.getAll(filters);
  }

  getSlabByDesignation(designation) {
    switch (designation) {
      case 'researchAssociate':
        return { trr: this.Incentive.TRR.ResearchAssociate, hon: this.Incentive.Hon.ResearchAssociate };
        break;
      case 'researchAnalyst':
      console.log('researchAnalyst',designation);
        return { trr: this.Incentive.TRR.ResearchAnalyst, hon: this.Incentive.Hon.ResearchAnalyst };
        break;
      case 'Sr. Research Analyst':
        return { trr: this.Incentive.TRR.SrResearchAnalyst, hon: this.Incentive.Hon.SrResearchAnalyst };
        break;
      case 'researchSpecialist':
        return { trr: this.Incentive.TRR.ResearchSpecialist, hon: this.Incentive.Hon.SrResearchAnalyst };
        break;
    }
    return '';
  }

  // Create new event
  create(data: Incentives): Observable<any> {
    return this.httpDispatcher.post(routes.events.create(), data);
  }

  getSlabPercent(count: number, slab: any) {
    for (let i = 0; i < slab.slabs.length; i++) {
      let slabSet = slab.slabs[i].split('-');
      if ((slabSet[0] == '0' || slabSet[0] <= count) && (slabSet[1] == '0' || slabSet[1] >= count)) {
        return slab[slab.slabs[i]];
      }
    }
    return 0;
  }

  Incentive = {
    TRR: {
      ResearchAssociate: {
        slabs: ['0-10', '11-15', '16-20', '21-0'],
        '0-10': 0,
        '11-15': 50,
        '16-20': 75,
        '20-0': 100,
      },
      ResearchAnalyst: {
        slabs: ['0-15', '16-20', '21-25', '26-0'],
        '0-15': 0,
        '16-20': 50,
        '21-25': 75,
        '26-0': 100,
      },
      SrResearchAnalyst: {
        slabs: ['0-20', '21-25', '26-30', '30-0'],
        '0-20': 0,
        '21-25': 50,
        '26-30': 75,
        '30-0': 100,
      },
      ResearchSpecialist: {
        slabs: ['0-25', '26-30', '31-35', '35-0'],
        '0-25': 0,
        '26-30': 50,
        '31-35': 75,
        '35-0': 100,
      },
    },
    Hon: {
      ResearchAssociate: {
        slabs: ['300-0', '250-299', '200-249', '0-200'],
        '300-0': 0,
        '250-299': 50,
        '200-249': 75,
        '0-200': 100,
      },
      ResearchAnalyst: {
        slabs: ['300-0', '250-299', '200-249', '0-200'],
        '300-0': 0,
        '250-299': 50,
        '200-249': 75,
        '0-200': 100,
      },
      SrResearchAnalyst: {
        slabs: ['300-0', '250-299', '200-249', '0-200'],
        '300-0': 0,
        '250-299': 50,
        '200-249': 75,
        '0-200': 100,
      },
      ResearchSpecialist: {
        slabs: ['300-0', '250-299', '200-249', '0-200'],
        '300-0': 0,
        '250-299': 50,
        '200-249': 75,
        '0-200': 100,
      },
    },
  };

  IncentivesDistribution = {
    TRR: 80,
    Hon: 20,
  };


}
