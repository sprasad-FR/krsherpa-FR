
import { Component, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Logger } from '../../core/logger.service';
//popup import
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// import { ToastrService } from 'ngx-toastr';

//import { Project } from '../models/project.model';
//import { employeeUser } from '../models/employee.model';
//import { Users } from '../../../core/models/default.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import { DateToLocalPipe, getCompanyTypePipe, GetInitialsPipe } from '../pipe';

const log = new Logger('Project count Component');

@Component({
  selector: 'app-processcount',
  templateUrl: './processcount.component.html',
  styleUrls: ['./processcount.component.scss'],
 
})
export class processcountComponent implements OnInit {
  isLoading: boolean = false;
  projectFormGrp: FormGroup;
  aravind: FormGroup;
  count: FormGroup;
  error: any | undefined;
 
  notes: any[];
  descriptionField: string;
  keyAccMgrList: any;
  researchMgrList: any;
  researchAnalystList: any;
  projectStatus: any;
  engagementTypes: any;
  projectTypes: any;
  clientsList: any;
  clientsBillingList: any;
  employeesList: any;
  selectedResearchAnalyst: any[];
  pageTitle: string;
  btnName: string;
  id: string; 
  sectors: any[];
  subindustry: any[];
  descriptionObj: any;
  industryGroup: any[];
  Industry: any[];
  industryGroupList: any[];
  industryList: any[];
  subIndustry: any[];
  today: string;
  public Editor = ClassicEditor;
  subIndustryList: any[];
  clientUsers: any[];
  projectComments: any[];
  files: any = [];
  RMList: string;
  RAList: string;
  tempRA: any;
  rAList: any;
  rMGList: any;
  reportingMgrEmail: any;
  whoaim: any;
  currentUser: any;
  newComment: {};
  @Input() itemid: string = '';
  @Input() readonly: boolean = true;
  employments: any[];
  questions: any[];


  subIndustrySummary: any;
  summary: string;

  constructor(
    private formBuilder: FormBuilder,
    //popup prive
    private modalService: NgbModal
  ) {
    this.whoaim = JSON.parse(localStorage.getItem('user'));
   
  }

  // popupstart
  popup(formmodal: any) {
    this.modalService.open(formmodal, { size: 'md', centered: true, windowClass: 'modal-holder' });
  }
  //popupend

  ngOnInit(): void {

    this.creatform()

    this.getprocesscountData()
    //countmethod
    this.gettotalcountData()
    //countend
    this.popupform()

    this.pageTitle = 'Data Update';
    this.btnName = '';

  }
 



  getformcData() {
    var filter = { "status": "0" }
    fetch('http://localhost:3500/rest/linkupdate/getnew',
      {
        method: "GET",
        headers: {
          // "Access-Control-Allow-Headers": "*", // this will allow all CORS requests
          // "Access-Control-Allow-Methods": 'OPTIONS,POST,GET', // this states the allowed methods
          "Content-Type": "application/json",
          // "timeout": "2000000"
          //'Access-Control-Allow-Origin':'*',
          //"Accept":"*/*",
          // "mode": "no-cors",
          // this shows the expected content type
        },

      }
    ).then(r => r.json()).then(projects => {
      debugger
      //console.log(projects)
      //console.log(projects.result[0]['link url'])
      //var get=projects.result[0]['link url']
      //document.getElementById("01").href=get
      //window.location.href=get
    },
      (error) => {
       
      }
    );
  }

  approvedcount:any=0;
  
  getprocesscountData(){
    //const projectData = this.count.value;
    // this.projectService.getAllMin(filters).subscribe(   getAll
    var filter = { "age": "21" }
    fetch('https://middle.krsherpa.com/rest/expert/usr/getProcsscount',
      {
        method: "POST",
        body: JSON.stringify(filter),
        headers: {
          // "Access-Control-Allow-Headers": "*", // this will allow all CORS requests
          // "Access-Control-Allow-Methods": 'OPTIONS,POST,GET', // this states the allowed methods
          "Content-Type": "application/json",
          // "timeout": "2000000"
          //'Access-Control-Allow-Origin':'*',
          //"Accept":"*/*",
          // "mode": "no-cors",
          // this shows the expected content type
        },

      }
    ).then(r => r.json()).then(projects => {


      this.approvedcount=projects

      //console.log(projects)
      //console.log(projects.result[0]['link url'])
      //var get=projects.result[0]['link url']
      //document.getElementById("01").href=get
      //window.location.href=get
    },
      (error) => {
        debugger

        this.isLoading = false;
      }
    );
  }


  
  totalcount:any=0;
  
  gettotalcountData(){
    //const projectData = this.count.value;
    // this.projectService.getAllMin(filters).subscribe(   getAll
    var filter = { "age": "21" }
    fetch('https://middle.krsherpa.com/rest/expert/usr/gettotcount',
      {
        method: "POST",
        body: JSON.stringify(filter),
        headers: {
          // "Access-Control-Allow-Headers": "*", // this will allow all CORS requests
          // "Access-Control-Allow-Methods": 'OPTIONS,POST,GET', // this states the allowed methods
          "Content-Type": "application/json",
          // "timeout": "2000000"
          //'Access-Control-Allow-Origin':'*',
          //"Accept":"*/*",
          // "mode": "no-cors",
          // this shows the expected content type
        },

      }
    ).then(r => r.json()).then(projects => {


      this.totalcount=projects

      //console.log(projects)
      //console.log(projects.result[0]['link url'])
      //var get=projects.result[0]['link url']
      //document.getElementById("01").href=get
      //window.location.href=get
    },
      (error) => {
        debugger

        this.isLoading = false;
      }
    );
  }


  submitData()
  {}

  // submitData() {
    
  //   const projectData = this.projectFormGrp.value;
  // }

  // createnewForm() {
  //   this.formc = this.formBuilder.group({

  //     age: [null, [Validators.required]],
  //     company: [null, [Validators.required]],
  //     status: [null, [Validators.required]],
  //   })
  // }

  popupform()
  {
    this.aravind = this.formBuilder.group({
      age: [null, [Validators.required]],
      company: [null, [Validators.required]],
      name: [null, [Validators.required]],
      status: [null, [Validators.required]],
    }) 
  }

  creatform()
  {
    this.count = this.formBuilder.group({

      result: [null, [Validators.required]],
      
    })
  }


}
