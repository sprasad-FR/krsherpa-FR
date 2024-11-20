import {Component, QueryList, ViewChildren, Input} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, FormControl, Validators } from '@angular/forms';
// Date Format
import {DatePipe} from '@angular/common';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// Csv File Export
import { ngxCsv } from 'ngx-csv/ngx-csv';

// Sweet Alert
import Swal from 'sweetalert2';

import {OrdersModel} from './orders.model';
import { Orders , chatMessagesData} from './data';
import { OrdersService } from './orders.service';
import { NgbdOrdersSortableHeader, SortEvent } from './orders-sortable.directive';

// Rest Api Service
import { restApiService } from "../../../core/services/rest-api.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [OrdersService, DecimalPipe]
})
   
/**
 * Orders Component
 */
export class OrdersComponent {
  public Editor = ClassicEditor;
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  ordersForm!: UntypedFormGroup;
  submitted = false;
  CustomersData!: OrdersModel[];
  masterSelected!:boolean;
  checkedList:any;
  customerName?:any;
  public Default = chatMessagesData;
  Pending = 'Pending';
  Inprogress = 'Inprogress';
  Cancelled = 'Cancelled';
  Pickups = 'Pickups';
  Returns = 'Returns';
  Delivered = 'Delivered';
  
  // Api Data
  content?: any;
  econtent?:any;
  orderes?: any;
  

  // Table data
  ordersList!: Observable<OrdersModel[]>;
  total: Observable<number>;
  @ViewChildren(NgbdOrdersSortableHeader) headers!: QueryList<NgbdOrdersSortableHeader>;

  constructor(private modalService: NgbModal,public service: OrdersService, private formBuilder: UntypedFormBuilder, private restApiService : restApiService, private datePipe: DatePipe) {
    this.ordersList = service.countries$;
    this.total = service.total$;
  }



  // primary
  primarycounter = 6;
  primarydecrement() {
    this.primarycounter--;
  }

  primaryincrement() {
    this.primarycounter++;
  }



 /**
   * Default Select2
   */
 selectedAccount = 'This is a placeholder';
 Defaultp = [
   { name: 'Mamta todi' },
   { name: 'Ankita sen' },
   { name: 'Choice 3' },
 ];


 DefaultStatus = [
  { name: 'High' },
  { name: 'Low' },

];



 selectedZones:any;

 Defaultt = [
  { name: 'Indian Time Zone' },
  { name: 'US-Eastern Time Zone' },
  { name: 'US-Centran Time Zone' },
  { name: 'US-Western Time Zone' },
  { name: 'Pacific Time Zone' },
];


 /**
  * Option groups Select2
  */
  selectedGroup = 'Choose a city';
  Groups = [
    { name: 'Montreal', country: 'CA', child: { state: 'Active' } },
    { name: 'Toronto', country: 'CA', child: { state: 'Active' } },
    { name: 'Vancouver', country: 'CA', child: { state: 'Active' } },
    { name: 'Lyon', country: 'FR', child: { state: 'Active' } },
    { name: 'Marseille', country: 'FR', child: { state: 'Active' } },
    { name: 'Paris', country: 'FR', child: { state: 'Active' } },
    { name: 'Barcelona', country: 'SP', child: { state: 'Active' } },
    { name: 'Madrid', country: 'SP', child: { state: 'Active' } },
    { name: 'Liverpool', country: 'UK', child: { state: 'Active' } },
    { name: 'London', country: 'UK', child: { state: 'Active' } },
    { name: 'Manchester', country: 'UK', child: { state: 'Active' } },
    { name: 'Michigan', country: 'US', child: { state: 'Active' } },
    { name: 'New York', country: 'US', child: { state: 'Active' } },
    { name: 'Washington', country: 'US', child: { state: 'Inactive' } }
  ];

  /**
 * Option Disabled groups Select2
 */
   selectedOption = 'Label Six';
   Options = [
     { name: 'Label Five' },
     { name: 'Label Four', 'disabled': true },
     { name: 'Label One' },
     { name: 'Label Six' },
     { name: 'Label Three' },
     { name: 'Label Two', 'disabled': true },
     { name: 'Zero' }];

   /**
 * Option Disabled groups Select2
 */
 searchselectedOption = 'Label Six';
 searchOptions = [
   { name: 'Label Five' },
   { name: 'Label Four', 'disabled': true },
   { name: 'Label One' },
   { name: 'Label Six' },
   { name: 'Label Three' },
   { name: 'Label Two', 'disabled': true },
   { name: 'Zero' }];

 /**
  * Multiple Default Select2
  */
  multiDefaultOption = 'Adam';

   /**
 * Multiple Default Select2
 */
 selectValue = ['Alaska', 'Hawaii', 'California', 'Nevada', 'Oregon', 'Washington', 'Arizona', 'Colorado', 'Idaho', 'Montana', 'Nebraska', 'New Mexico', 'North Dakota', 'Utah', 'Wyoming', 'Alabama', 'Arkansas', 'Illinois', 'Iowa'];

  /**
  * Disabled Select2
  */
   disable = true;
   selectedPeople = [
     { name: 'josh@joshuajohnson.co.uk', disabled: true },
     { name: 'joe@bloggs.co.uk', disabled: true }
   ];



/*
  // secondary
  secondarycounter = 1;
  secondarydecrement() {
    this.secondarycounter--;
  }

  secondaryincrement() {
    this.secondarycounter++;
  }

  // success
  successcounter = 4;
  successdecrement() {
    this.successcounter--;
  }

  successincrement() {
    this.successcounter++;
  }

  // Info
  infocounter = 1;
  infodecrement() {
    this.infocounter--;
  }

  infoincrement() {
    this.infocounter++;
  }
 */

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Ecommerce' },
      { label: 'Orders', active: true }
    ];

    /**
     * Form Validation
     */
    this.ordersForm = this.formBuilder.group({
      orderId: "#VZ2101",
      _id: "#1",
      ids: [''],
      customer: ['', [Validators.required]],
      product: ['', [Validators.required]],
      orderDate: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      payment: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });

    /**
    * fetches data
    */
     this.orderes=Orders;

   /*

    this.ordersList.subscribe(x => {
      this.orderes =  Object.assign([], x);   
    });
*/

  }

  /**
   * Open modal
   * @param content modal content
  */
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  /**
  * Form data get
  */
  get form() {
    return this.ordersForm.controls;
  }

  /**
  * Save user
  */  
  saveUser() {
    if (this.ordersForm.valid) {
      if (this.ordersForm.get('ids')?.value) {
        this.restApiService.patchOrderData(this.ordersForm.value).subscribe(
          (data: any) => {
            this.orderes = this.orderes.map((order: { _id: any; }) => order._id === data.data.ids ? { ...order, ...data.data } : order);
            this.modalService.dismissAll();
          }
        )
      }
      else{
        this.restApiService.postOrderData(this.ordersForm.value).subscribe(
          (data: any) => {
            this.orderes.push(data.data);               
            this.modalService.dismissAll();
            let timerInterval: any;
            Swal.fire({
              title: 'Order inserted successfully!',
              icon: 'success',
              timer: 2000,
              timerProgressBar: true,
              willClose: () => {
                clearInterval(timerInterval);
              },
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
              }
            });  
        },) 
      }
    }
    console.log('a', this.orderes);
    setTimeout(() => {
      this.ordersForm.reset();
    }, 2000);
    this.submitted = true
  }

  
  openprj(content:any) {

    this.modalService.open(content, {  windowClass: 'my-class',  centered: true });

  }
  /**
   * Open Edit modal
   * @param content modal content
   */
   editDataGet(id: any, content:any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = 'Edit Order';
    var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    updateBtn.innerHTML = "Update";

    this.restApiService.getSingleOrderData(id).subscribe({
      next: data => {    
        const users =  JSON.parse(data);
        this.econtent = users.data; 
        this.ordersForm.controls['customer'].setValue(this.econtent.customer);
        this.ordersForm.controls['product'].setValue(this.econtent.product);
        this.ordersForm.controls['orderDate'].setValue(this.econtent.orderDate);
        this.ordersForm.controls['amount'].setValue(this.econtent.amount);
        this.ordersForm.controls['payment'].setValue(this.econtent.payment);
        this.ordersForm.controls['status'].setValue(this.econtent.status);
        this.ordersForm.controls['ids'].setValue(this.econtent._id);
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
    
  }

  /**
  * Delete Model Open
  */
   deleteId: any;
   confirm(content: any,id:any) {
     this.deleteId = id;
     this.modalService.open(content, { centered: true });
   }
 
   // Delete Data
   deleteData(id:any) {    
     if(id){
       this.restApiService.deleteOrder(id).subscribe({
         next: data => { },
         error: err => {
           this.content = JSON.parse(err.error).message;
         }
       });
       document.getElementById('o_'+id)?.remove();   
     }
     else{
       this.checkedValGet.forEach((item:any)=>{
         document.getElementById('o_'+ item)?.remove();      
       });
     }
   }

  /**
  * Multiple Delete
  */
  checkedValGet: any[] = [];
  deleteMultiple(content:any){
    var checkboxes:any = document.getElementsByName('checkAll');
    var result
    var checkedVal: any[] = [];
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
          result = checkboxes[i].value;
          checkedVal.push(result);   
      }
    }
    if(checkedVal.length > 0){
      this.modalService.open(content, { centered: true });
    }
    else{
      Swal.fire({text:'Please select at least one checkbox',confirmButtonColor: '#299cdb',});
    }
    this.checkedValGet = checkedVal;
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev:any) {    
    this.orderes.forEach((x: { state: any; }) => x.state = ev.target.checked)
  }

  // Csv File Export
  csvFileExport(){    
    var orders = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Order Data',
      useBom: true,
      noDownload: false,
      headers: ["id", "order Id", "customer", "product", "orderDate", "amount","payment","status"]
    };
    new ngxCsv(this.orderes, "orders", orders);
  }

}
