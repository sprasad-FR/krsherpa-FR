import { Component, OnInit } from '@angular/core';
// import { time } from 'console';
import { data } from 'jquery';
// import { hrtime } from 'process';
import { DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe } from '../pipe';
// @Component({
//   selector: 'app-overview',
//   templateUrl: './overview.component.html',
//   styleUrls: ['./overview.component.scss'],
//   providers: [DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe ],

// })

@Component({
  selector: 'app-chat-boxc',
  templateUrl: './chat-boxc.component.html',
  styleUrls: ['./chat-boxc.component.scss'],
  providers: [DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe ],
})
export class ChatBoxcComponent implements OnInit {

  constructor() { }

  qa :any;

  ngOnInit(): void {

   this.qa = [{
    
    }];
  }


  questions = [
    {
      "questions":"How many years of experience?",
      "answers":""
    },
    {
      "questions":"Worked in USA?",
       "answers":""
    }
  
  
];

  
  // answers: string[] = [];
  
  updateAnswer(index: number) {
    // Assuming you want to update the answer at the specified index
    const updatedAnswer = this.qa[index];
    // You can perform additional validation or logic here if needed
  
    // Update the answer in the array
  //  this.questions[index].answers=updatedAnswer;
    console.log(this.questions);

  }








  




  // messages: string[] = [];

 


showChatBox: boolean = false;


toggleChatBox() {
  this.showChatBox = !this.showChatBox;
  
}


}