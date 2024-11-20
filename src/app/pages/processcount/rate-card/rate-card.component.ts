import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { country } from './data';

@Component({
  selector: 'app-rate-card',
  templateUrl: './rate-card.component.html',
  styleUrls: ['./rate-card.component.scss']
})
export class RateCardComponent implements OnInit {
workingDetails2: any;
workingDetails1: any;
public Editor = ClassicEditor; 
country: any[] =country;
sendExtoClient() {
throw new Error('Method not implemented.');
}
screenquestions: any;
workingDetails: any;
selectedgtam: any;
isLoading: any;

  constructor(
    private modalService:NgbModal
  ) { }

  ngOnInit(): void {
    this.DataDisplay()
  }
  cardlist:any[]=[];
  uniqueGeographies:any[]=[];
  geography:any;

  DataDisplay(){
    fetch('https://middle.krsherpa.com/projects/ratecards/list')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        this.cardlist=data;
        this.uniqueGeographies = [...new Set(this.cardlist.map(card => card.geography))];
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

  }

  popupopen(popup,data,type){
    this.modalService.open(popup,{size:'lg',centered:true})
    const clickid= document.getElementById('clickBtn')
    const title= document.querySelector('.modal-title')
    if(type === 'add'){
      // title.textContent="Create Card"
      // this.geography = '';
      // this.expertType = '';
      // this.Multiplier = '';
      // this.MinutesRate['60'] = '';
      // this.MinutesRate['45'] = '';
      // this.MinutesRate['30'] = '';
      // this.MinutesRate['15'] = '';
      // if(clickid){
      //   clickid.textContent='Add';
      //   clickid.addEventListener('click',() =>this.Addcard())
      // }
    }
    if(type === 'edit'){
      title.textContent="Edit Card"
      this.geography = data?.geography;
      this.expertType = data?.expertType;
      this.Multiplier = data?.multiplierValue;
      this.MinutesRate['60'] = data['60minutesrate'];
      this.MinutesRate['45'] =data['45minutesrate'];
      this.MinutesRate['30'] = data['30minutesrate'];
      this.MinutesRate['15'] = data['15minutesrate'];
      if(clickid){
        clickid.textContent='Update';
        clickid.addEventListener('click',() =>this.Updatecard(data))
      }
    }
  }
  Multiplier:any;
  expertType:any;
  MinutesRate: { [key: string]: any } = {};
  Addcard(){
    var data={
      'geography':this.geography,
      'expertType':this.expertType,
      'multiplierValue':this.Multiplier,
      '60minutesrate':this.MinutesRate['60'],
      '45minutesrate':this.MinutesRate['45'],
      '30minutesrate':this.MinutesRate['30'],
      '15minutesrate':this.MinutesRate['15'],
    }
    fetch('https://middle.krsherpa.com/projects/ratecards/add',{
      method:'POST',
      body:JSON.stringify(data),
      headers:{'Content-Type':'application/json'}
    })
    .then(res =>res.json())
    .then(async data =>{
      if(data&&data.success){
        alert('Failed to Add data');
      }else{
        alert('Add successfully');
        await this.DataDisplay()
      }
    })
    this.modalService.dismissAll();
  }
  Updatecard(data){
    data.geography = this.geography
    data.expertType = this.expertType;
    data.multiplierValue = this.Multiplier;
    data['60minutesrate'] = this.MinutesRate['60'];
    data['45minutesrate'] = this.MinutesRate['45'];
    data['30minutesrate'] = this.MinutesRate['30'];
    data['15minutesrate'] = this.MinutesRate['15'];

    fetch('https://middle.krsherpa.com/projects/ratecards/update',{
      method:'POST',
      body:JSON.stringify(data),
      headers:{'Content-Type':'application/json'}
    })
    .then(res =>res.json())
    .then(async data =>{
      if(data&&data.success){
        alert('Failed to Update data');
      }else{
        alert('Update successfully');
        await this.DataDisplay()
      }
    })
    this.modalService.dismissAll();
  }

  confirm(data: any) {
    const shouldDelete = window.confirm('Are you sure you want to delete this item?');
    if (shouldDelete) {
      const index = this.cardlist.indexOf(data);
      if (index !== -1) {
        this.cardlist.splice(index, 1);
      }
    }
  } 
  
  MultipliervalueArray:any[]=[];
  rate:any;
  nonus_government_employee:boolean;
  SelectCard(event,type) {
    if(type === 'card'){
      const value = event.toLowerCase();
      this.MultipliervalueArray = this.cardlist.filter((card) => card.geography.toLowerCase() === value);
      //console.log(this.MultipliervalueArray);
    }
    if(type === 'multiplier'){
      const value = event.multiplierValue;
      this.rate = this.MultipliervalueArray.find((card) => card.multiplierValue === value)['60minutesrate'];
      //console.log(this.MultipliervalueArray);
    }
  }

  
}
