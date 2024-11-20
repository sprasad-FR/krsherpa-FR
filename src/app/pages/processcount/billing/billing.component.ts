import { Component, Input, OnInit, OnChanges} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CSVService } from '../../../core/services/data2CSV.service';


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent  implements OnInit {

  fromDate: string; // stores from date
  toDate: string;   // stores to date


  constructor(
    private modalService:NgbModal,
    private csvservice: CSVService,
  ) { }

  ngOnInit(): void {
    this.fromDate = this.formatDate(new Date());
    this.toDate = this.formatDate(new Date());

  //  this.availableFields();
  }

  private formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero based
    const year = date.getFullYear();
    return `${year}-${this.padNumber(month)}-${this.padNumber(day)}`;
  }
 // Function to pad single digit number with zero
 private padNumber(num: number): string {
  return (num < 10) ? `0${num}` : num.toString();
}

download(): void {
  // Assuming you will call an API here with fromDate and toDate


  this.csvservice.downloadFile(this.ModuleData,this.selectedFields, 'BillingData');
   


}
  // List of available fields

 availableFieldsArray = [
"Event Id","SME Number","Event At","Type","Status","Expert Rate Type","Expert Rate","Project Name","Client Company Name","clientManager","clientManagerId","Expert Currency","Expert Duration","Client Duration","Client Billable Amount","Client Currency","Expert Payable Amount","Event Duration", "Expert Comments", "Client Comments","Rate for Client","Multiplication Factor","Expert Minimum Duration","Client Minimum Duration","Created At","Updated At","CP Rate Type","Minimum Duration Type","CP Minimum Duration Type","Prorated","Client Invoice Id","Client Payable Amount","Expert Invoice Id","Expert Id","Expert Name","Expert User Id","Research Analyst Name","Research Manager Name","Key Account Manager Name","Expert Is Lead","Expert Terms","Expert KR Relationship Manager","Expert Pay Country","Expert ACH Account Number","Expert ACH Account Type","Expert ACH Bank Address","Expert ACH Bank Name","Expert ACH Beneficiary Address","Expert ACH Beneficiary Country","Expert ACH Beneficiary Name","Expert ACH Postal Code","Expert ACH Swift Code","Expert Amazon Code","Expert Bank Account Number","Expert Bank Account Type","Expert Bank Name","Expert Branch Name","Expert Country","Expert Current Employer","Expert Designation","Expert IBAN Number","Expert IFSC Code","Expert PAN Card","Expert Payment Preference","Expert PayPal Code","Expert Routing Number","Expert Shift Code"  
 ];
  // List of available fields

  fetchData(){
    
    console.log('From Date:', this.fromDate);
    console.log('To Date:', this.toDate);


   var data={
      "from": this.fromDate,
      "to": this.toDate,
      "client":'',
      "pagesize":''
    }

/*
   var  data={
      "month": 4,
      "year": 2024,
      "client":'',
      "pagesize":''
    }
    */
    fetch('https://middle.krsherpa.com/projects/billing/list',{
      method:"POST",
      body:JSON.stringify(data),
      headers:{'Content-Type':'application/json'}
    })
      .then((res) => res.json())
      .then((data) => {
        
        this.ModuleData=data;
       // this.availableFieldsArray = [];
       // this.availableFieldsArray = Object?.keys(data[0]);
       this.FieldArray = this.selectedFields;
        console.log(this.availableFieldsArray);
    });
  }

  FieldsArray:any;
  ModuleData:any[]=[];


  rateFormValues = {
    min30: '',
    min45: '',
    min60: '',
    min: '',
    rate: null
  };
  RateArray:any[] = []
  GetRate(event,json){
    const value = event.target.value;
    const find_data = this.RateArray.find(item=>item.min === json)
    if(find_data){
      find_data.rate = value
    }else{
      this.RateArray.push({'min':json,'rate':value})
    }
  }


// Function to convert data object to CSV format
 convertToCSV(data, columns) {
  const header = columns.join(',');
  const rows = data.map(item => {
    return columns.map(column => {
      if (column.includes('.')) {
        // Handle nested properties
        const nestedProps = column.split('.');
        let value = item;
        for (let prop of nestedProps) {
          value = value[prop];
        }
        return value;
      } else {
        return item[column];
      }
    }).join(',');
  });
  return `${header}\n${rows.join('\n')}`;
}

/*
// Function to download CSV file
function downloadCSV(csvContent, fileName) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) {
    // For IE 10 and above
    navigator.msSaveBlob(blob, fileName);
  } else {
    const link = document.createElement('a');
    if (link.download !== undefined) {
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
*/
// Convert data to CSV format
//const csvContent = convertToCSV(eventData, columns);

// Download CSV file
//downloadCSV(csvContent, 'event_data.csv');



  onSubmit() {    
    const find_data = this.RateArray.find(item=>item.min === this.rateFormValues.min+'min')
    if(find_data){
      find_data.rate = this.rateFormValues.rate;
      this.rateFormValues['min'+this.rateFormValues.min] = this.rateFormValues.rate;
    }else{
      this.RateArray.push({'min':this.rateFormValues.min+'min','rate':this.rateFormValues.rate})
    }
    this.rateFormValues.min = '';
    this.rateFormValues.rate = '';
  }

  EditRateValues ={
    edit_min :null,
    edit_rate: ''
  }
  EditRate(popup,data){
    this.modalService.open(popup,{size:'md',centered:true})
    const numericPart = data.min.slice(0, -3); 
    this.EditRateValues.edit_min = numericPart;
    this.EditRateValues.edit_rate = data.rate;
    const bnt = document.getElementById('update-btn');
    if(bnt){
      bnt.addEventListener('click',()=>this.onUpdate(data,numericPart))
    }
  }
  onUpdate(data,numericPart){
    data.min = this.EditRateValues.edit_min + 'min';
    data.rate = this.EditRateValues.edit_rate;
    console.log(this.rateFormValues['min'+this.EditRateValues.edit_min])
    let minutes = [30,45,60]
    // minutes.forEach(min=>{
    //   if(min === this.EditRateValues.edit_min){
    //     this.rateFormValues['min'+min] = data.rate;
    //   }else{
    //     this.rateFormValues['min'+numericPart] = '';
    //   }
    // })
    this.modalService.dismissAll()
  }
  DeleteRate(data) {
    const index = this.RateArray.indexOf(data);
    const confirm = window.confirm('Are You Sure You Want to Delete This Item?');
    if (confirm) {
      if (index !== -1) {
        this.RateArray.splice(index, 1);
      }
      const numericPart = data.min.slice(0, -3); 
      if(this.rateFormValues['min'+numericPart]){
        this.rateFormValues['min'+numericPart] = '';
      }
    }
  }
  
  select_minutes:any;
  SelectMinute(){
    console.log(this.select_minutes)
  }




  
  //selectedFields:any[] = ['client_companyName','keyAccountManager_name','expert_Name','projectName','rateForClient','clientCurrency','expertRate','expertCurrency'];
  getInitials(fld: string ,name: string,type){
    if (!name) return '';
    if (fld==="Project Name" || fld==="Client Company Name" ) return name;



    let initials = '';
    if(type === 'multiple'){
      if (name.length > 15) {
        initials = name.substring(0, 14) + ' ....';
      } else {
          initials = name;
      } 
    }
    if(type === 'single'){
      if (name.length > 10) {
        initials = name.substring(0, 10) + ' ....';
      } else {
          initials = name;
      } 
    }
    
    return initials;
  }
  edit_client:any;
  SelectFields(popup,type){
    this.modalService.open(popup,{size:'lg',centered:true})
    const clickid = document.getElementById('MultipleArrayAdd')
    //this.FieldArray = this.GetUserModule.fields ;
    if(clickid){
      clickid.textContent='Update';
      clickid.addEventListener('click',() =>this.FieldsAdd())
    }
  }


  selectedFields = [
    "Project Name",
    "Client Company Name",
    "clientManager",
      "clientManagerId",
    "Expert Rate Type",
    "Expert Rate",
    "Expert Currency",
    "Expert  Duration",
            "Client  Duration",
            "Client Billable Amount",
            "Client Currency",
            "Expert Payable Amount",
            "Expert Currency",
            "Event Duration",
            "Expert Comments",
"Client Comments",
    "Rate for Client", 
    "Multiplication Factor",
    "Research Analyst Name",
    "Research Manager Name",
    "Key Account Manager Name",            
    "Expert Name",
    "Expert Rate",  
    "Expert Rate Type",
    "Expert Is Lead",
    "Expert Terms",
    "Expert KR Relationship Manager",
    "Expert Pay Country",
    "Expert Pay Currency",
    "Expert ACH Account Number",
    "Expert ACH Account Type",
    "Expert ACH Bank Address",
    "Expert ACH Bank Name",
    "Expert ACH Beneficiary Address",
    "Expert ACH Beneficiary Country",
    "Expert ACH Beneficiary Name",
    "Expert ACH Postal Code",
    "Expert ACH Swift Code",
    "Expert Amazon Code",
    "Expert Bank Account Number",
    "Expert Bank Account Type",
    "Expert Bank Name",
    "Expert Branch Name",
    "Expert IBAN Number",
    "Expert IFSC Code",
    "Expert PAN Card",
    "Expert Payment Preference",
    "Expert PayPal Code",
    "Expert Routing Number",
    "Expert Shift Code"
];
FieldArray:any[] =[];
  async FieldsAdd(){
    this.selectedFields=[];
    this.selectedFields.push(...this.FieldArray)
    console.log(this.selectedFields)
    this.modalService.dismissAll();
  }




}
