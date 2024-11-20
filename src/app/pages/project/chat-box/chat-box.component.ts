
import { Component, Input, Output, OnInit } from '@angular/core';
// import { time } from 'console';
import { data } from 'jquery';
// import { hrtime } from 'process';
import { DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe } from '../pipe';
// @Component({
//   selector: 'app-overview',
//   templateUrl: './overview.component.html',
//   styleUrls: ['./overview.component.scss'],
//   providers: [DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe ],
import { DatePipe } from '@angular/common';
import { ProjectService } from '../../../core/services/project.service';
// })
import { mckService } from '../../../core/services/mck.service';
import { ToastService } from '../../toast-service';


@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
  providers: [DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe ],
})
export class ChatBoxComponent implements OnInit {

  constructor(private datePipe: DatePipe,
    public toasterService: ToastService,  
     private readonly mckservice: mckService,
    private readonly projectService: ProjectService,) { }

  inmessage :any;
  @Input() projectid: any;
  @Input() workstreams: any[];
  @Input() experts: any[];
  whoiam:any;
id:any;

gtcExperts:any[];

projectDetails:any;

  ngOnInit(): void {

    this.id = this.projectid;//this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.fetchData();
    }

    
    this.whoiam = JSON.parse(window.localStorage.getItem('user'));
   
   this.inmessage = [];

   


  }

 
  private fetchData() {
    this.getProjectDetail();
 
   
    // this.getCompletedEvents();
    // this.getUsers();
     //this.getcomplianceDetails();cha
   }
 

   

   private getProjectDetail() {


    const filters = new Map();
    const filter = {
     
      
    };
    filters.set('filter', JSON.stringify(filter));

    this.projectService.show(this.id,filters).subscribe(
      (project: any) => {
debugger
//console.log (project)*ngIf="isMcKinsey==true"
        this.projectDetails = project;

  //mck chages start
 
 // this.workstreams = this.projectDetails?.workstreams,cha




  this.workstreams=[];
        
  this.gtcExperts=[];
  

  if ( this.projectDetails["workstreams"] && this.projectDetails["workstreams"]!=null)
  {
    
    for (let index = 0; index < this.projectDetails["workstreams"].length; index++) {
      var element = this.projectDetails["workstreams"][index];
  
      
  
      console.log("workstreams",element)
    const qq={
    "name":element?.title,
    "id":element?.id,
    "internalWSId":element?.internal_workstream_id
    }
    console.log(qq)
    this.workstreams.push(qq)
    
  
    }
    
  }
  


  if ( this.projectDetails["givenToClient"] && this.projectDetails["givenToClient"]!=null)
  {
    
    for (let index = 0; index < this.projectDetails["givenToClient"].length; index++) {
      var element = this.projectDetails["givenToClient"][index];
  
      
  
      console.log("givenToClient",element)
    const qq={
    "name":element?.firstName +" "+element?.lastName,
    "id":element?.id,
    "userid":element?.userId
    }
    this.gtcExperts.push(qq)
  
    
    }
    
  }


 this.experts=this.projectDetails?.givenToClient
  //mck end  gtcExperts

this.getchats();



        
      },
      (error: any) => {}
    );
  }



  // messages: string[] = [];

  newMessage: string = '';
  selectedExpert: string = '';
  selectedWS: string = '';



  async sendMessage() {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd HH:mm');

//alert (this.selectedExpert)
//alert (this.selectedWS)

if (this.selectedWS=="")
{
alert("Please select a workstream");
return
}

if (this.newMessage=="")
{
alert("Please provide a message");
return
}
    if (this.newMessage.trim() !== '') {
      this.inmessage.push({
        "name": this.whoiam.firstName,
        "time":formattedDate,
        "ws":this.selectedWS,
        "exp":this.selectedExpert,
        "message":this.newMessage,
      });
     
    }

  

    var mckinseymsg= {
      "attachments":[],
      "network_project_id":   this.projectDetails?.id ,
      "network_expert_id":   this.selectedExpert ,
      "network_workstream_id":  this.selectedWS ,
      "from_email": this.whoiam.username,   //"mamta.todi@knowledgeridge.com",
      "text":  this.newMessage,
   
      }
  

    var url='https://middle.krsherpa.com/prod-mck/sendchat' ;  
    //var url='http://localhost:3000/mck/sendslot' ;  
    await fetch(url, {method: "POST",
    body: JSON.stringify(mckinseymsg),
    headers: {
    
     "Content-Type": "application/json",
     "timeout": "2000000" 
    
    },
    
    }
    ).then(r => r.json()).then(result => {
      // Result now contains the response text, do what you want...
    console.log('id is:',result);
     },
     (error: any) => {
      
     }
    );



    this.toasterService.success(`Message sent to client.`, 'Success!');








}

showChatBox: boolean = false;

showicon: boolean = true;

toggleChatBox() {
  this.showChatBox = !this.showChatBox;
  this.showicon = !this.showicon;
}



async getchats() {
  var id= this.projectDetails?.id 
  console.log('id is:',id);
 
  var url='https://middle.krsherpa.com/prod-mck/getchats/'+id ;  
  //var url='http://localhost:3000/mck/sendslot' ;  
  await fetch(url, {method: "GET",

  headers: {
  
   "Content-Type": "application/json",
   "timeout": "2000000" 
  
  },
  
  }
  ).then(r => r.json()).then(result => {
    // Result now contains the response text, do what you want...
  console.log('id is:',result);

  var arr=result.result;

console.log(arr)
    for (let index = 0; index < arr.length; index++) {

      const element = arr[index];
      console.log(element)

      let worstreamres = this.workstreams?.find((x) => x.id ==element.Network_workstream_id)?.name; 

      let expert = this.gtcExperts?.find((x) => x.id ==element.network_expert_id)?.name; 

      console.log( this.gtcExperts)


    //console.log("name",text)
    this.inmessage.push({
      "name":element.from_email,
      "ws":worstreamres,
      "exp":expert,
      "message":element.text,
   
    //this.newMessage = '';
  })



//    //console.log("name",text)
//    this.inmessage.push({
//     "name":"",
//     "ws":workstreamname,
//     "exp":workstreamname,
//     "message":this.newMessage,
 
//   //this.newMessage = '';
// })


    }




    
   },
   (error: any) => {
    
   }
  );

}



}