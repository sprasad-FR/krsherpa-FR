import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mns-projects',
  templateUrl: './mns-projects.component.html',
  styleUrls: ['./mns-projects.component.scss']
})
export class MnsProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  limt:number=30;
  RecordsList:any[]=[];
  GetRecord(){
    if(this.limt !== undefined && this.limt !== null){
      var filter={
        "limit":this.limt,
        "offset":0
      }
    }else{
      const limeid=document.getElementById('limt')
      alert('Please Enter The Limt Value');
      limeid.focus();
      return;
    }
    fetch('https://middle.krsherpa.com/prod-mck/getoldprojects',{
      method:"POST",
      body:JSON.stringify(filter),
      headers:{'Content-Type':'application/json'}
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
      this.RecordsList = data.projects;
      for (let index = 0; index < data.projects.length; index++) {
        const record = data.projects[index];
        if(record?.network_project_id === null){
          this.ishidebtn[record?.internal_project_id] = true;
        }
      }
    })
  }
  ishidebtn: { [id: string]: boolean} = {};
  GetRequest(record){
    console.log(record)
    var filter={
      "id": record?.internal_project_id
    }
    fetch('https://middle.krsherpa.com/prod-mck/notifyproject',{
      method:"POST",
      body:JSON.stringify(filter),
      headers:{'Content-Type':'application/json'}
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
      this.ishidebtn[record?.internal_project_id] = false;
    })
  }
}
