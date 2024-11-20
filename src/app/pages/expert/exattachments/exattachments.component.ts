import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Logger } from '../../../core/logger.service';
import { ProjectService } from '../../../core/services/project.service';
import {  Input, Output } from '@angular/core';
const log = new Logger('Project Attachments Component');
import { ExpertService } from '../../../core//services/expert.service';

                          
import { FileUploadService } from '../../../core/services/fupload.service';
                 


@Component({
  selector: 'app-exattachments',
  templateUrl: './exattachments.component.html',
  styleUrls: ['./exattachments.component.scss'],
})
export class EXAttachmentsComponent implements OnInit {
  files: File[] = [];
  isLoading: boolean = false;
  id: string;
  mediaData: any = {
    attachments: [],
  };

  fileName :any;
  currentFile!: File;
  filesToUpload :any[]=[];
  filetype: any="";

  //
@Input() itemid: string='';
@Input() readonly: boolean=true;
  constructor(private route: ActivatedRoute,
    private fileuploadService: FileUploadService, 
    private readonly projectService: ExpertService) {}
projectdata:any;

  ngOnInit(): void {
    this.id = this.itemid;// this.route.snapshot.paramMap.get('id');
  this.getbyid();
  }

getbyid()
{
  this.projectService.show(this.id).subscribe((response) => {
    this.projectdata=response;
    
     this.mediaData.attachments = response.attachments || [];
   });

}
file!: File ; // Variable to store file


//On file Select
onChange(event:any) {

  let file = event.target.files[0]
console.log(file)
//console.log(file.data.toString());
this.filesToUpload = [];
this.filesToUpload.push(file);
this.fileName = file['name'];
    this.file = event.target.files[0];
}


  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }


              
  // OnClick of button Upload
  onUpload() {
   
    this.fileName=this.fileuploadService.getguid();
    
   // console.log(this.file);
  
    debugger
 //this.fileuploadService.uploadFile(this.fileName, this.filesToUpload[0],'client').subscribe(
   
 var nm=this.filesToUpload[0].name;

 var filetype=this.filesToUpload[0].type;

    
    this.fileuploadService.uploadFile(this.fileName, this.filesToUpload[0],'expert').subscribe(
        (data: any) => {
          console.log('file data', data);
            if ((typeof (data) === 'object')&&(data.status==200) ){

console.log('file done');

/*
this.projectdata.agreementType = this.projectdata?.agreementType == true ? "MSA" : "Non MSA";
this.projectdata.packageType = this.projectdata?.packageType == true ? 'Wallet' : 'Credit';
this.projectdata.fax = (this.projectdata?.fax )? this.projectdata?.fax: ' ';
*/
if (this.projectdata.attachments!=undefined)
{
this.projectdata.attachments.push({"filename":nm, "s3name":this.fileName,"mediatype":filetype ,"filetype":this.filetype})
}
else{
this.projectdata.attachments=[{"filename":nm, "s3name":this.fileName,"mediatype":filetype ,"filetype":this.filetype}]
}

const leadUpdateSubmit$ = this.projectService.updateOnly(this.id, this.projectdata);
leadUpdateSubmit$.subscribe(
(data1: any) => {
// swalWithBootstrapButtons.fire('Updated!', 'Lead stage changed.', 'success');

// emailVariableObj['currentUser'] =  this.whoami.firstName;
// emailVariableObj['SalesLeadLink'] =  this.whoami.firstName;

this.getbyid();
},
(error: any) => {
//  swalWithBootstrapButtons.fire('Warning', 'Lead stage not changed', 'error');
}
);

              // Flag variable 
            }

        },
  (error: any) => {  console.log(error);}
    );
}



openNewTab(url) {
  window.open(url, '_blank');
}
  


  mediaUploaded($event) {
    this.mediaData.attachments.push($event);
    this.updateOnServer(this.mediaData);
  }

  // Update media data on server
  private updateOnServer(updateData: any) {
    this.projectService.updateOnly(this.id, updateData).subscribe(
      (response) => {
        this.isLoading = false;
      },
      (error) => {
        log.error(error);
        // this.error = error;
        this.isLoading = false;
      }
    );
  }
}
