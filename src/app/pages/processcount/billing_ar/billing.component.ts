import { Component, Input, OnInit, OnChanges} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent  implements OnInit {


  constructor(
    private modalService:NgbModal,
  ) { }

  ngOnInit(): void {
    this.availableFields();
  }


  // List of available fields
  availableFieldsArray = [
    "Event Id","SME Number",
    "Event At",
    "Type",
    "Status",
    "Expert Rate Type",
    "Expert Rate",
    "Expert Currency",
    "Rate for Client",
    "Client Currency",
    "Multiplication Factor",
    "Expert Minimum Duration",
    "Client Minimum Duration",
    "Created At",
    "Updated At",
    "CP Rate Type",
    "Minimum Duration Type",
    "CP Minimum Duration Type",
    "Prorated",
    "CP Prorated",
    "Client Invoice Id",
    "Client Payable Amount",
    "Event Duration",
    "Expert Invoice Id",
    "Project Name",
    "Expert Id",
    "Expert Name",
    "Expert User Id",
    "Research Analyst Name",
    "Research Manager Name",
    "Key Account Manager Name",
    "Client Company Name",
    "Expert Status",
    "Expert Rate",
    "Expert Currency",
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
    "Expert Country",
    "Expert Current Employer",
    "Expert Designation",
    "Expert IBAN Number",
    "Expert IFSC Code",
    "Expert PAN Card",
    "Expert Payment Preference",
    "Expert PayPal Code",
    "Expert Routing Number",
    "Expert Shift Code"
];

  availableFields(){
    var data={
      'from':'2024-05-01',
      'to':'2024-06-01',
    }
    fetch('https://middle.krsherpa.com/projects/billing/list',{
      method:"POST",
      body:JSON.stringify(data),
      headers:{'Content-Type':'application/json'}
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.ModuleData=data;
        this.FieldArray = this.selectedFields;
        // this.availableFieldsArray = [];
        // this.availableFieldsArray = Object.keys(data[0].event);
    });
  }
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
    const find_data = this.RateArray?.find(item=>item.min === json)
    if(find_data){
      find_data.rate = value
    }else{
      this.RateArray.push({'min':json,'rate':value})
    }
  }

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

  FieldsArray:any;
  ModuleData:any[]=[];
  getInitials(name: string,type){
    if (!name) return '';
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
    this.modalService.open(popup,{size:'md',centered:true})
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
    "Expert Rate Type",
    "Expert Rate",
    "Expert Currency",
    "Rate for Client",
    "Client Currency",
    "Multiplication Factor",
    "Research Analyst Name",
    "Research Manager Name",
    "Key Account Manager Name",            
    "Expert Name",
    "Expert Rate",
    "Expert Currency",
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
