import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../model/customer';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit{

  displayedColumns: string[] = ['idCustomer', 'firstNameCustomer', 'lastNameCustomer', 'cpfCustomer', 'birthdateCustomer', 'dateCreatedCustomer', 'monthlyIncomeCustomer', 'emailCustomer', 'statusCustomer','deleteCustomer','findCustomer'];
  ELEMENT_DATA: Customer[] = [];
  message: string = '';
  dataSource = new MatTableDataSource<Customer>(this.ELEMENT_DATA);
  success: boolean = false;
  errors!: String[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  customer: Customer = {
    idCustomer: '',
    firstNameCustomer: '',
    lastNameCustomer: '',
    cpfCustomer: '',
    birthdateCustomer: '',
    dateCreatedCustomer: '',
    monthlyIncomeCustomer: '',
    statusCustomer: true,
    emailCustomer: '',
    passwordCustomer: '',
}


  constructor(private customerService:CustomerService){}
  ngOnInit(): void {
    this.listCustomer();
  }

  public saveCustomer(){
    const datePipe = new DatePipe('en-US')
    this.customer.birthdateCustomer = datePipe.transform(this.customer.birthdateCustomer, 'dd/MM/YYYY')
    if (this.customer.idCustomer== ""){
    this.customerService.save(this.customer).subscribe({next: response =>{
      this.success = true;
      this.errors = [];
      this.listCustomer();    
    }, error: ex => {
      if (ex.error.errors) {
        this.errors = ex.error.errors;
        this.success = false;
        ex.error.errors.forEach((element:any) => {         
        });
      } else {
          this.success = false;
          this.errors = ex.error.errors;        
      }
    }})}
    else{
      this.customerService.update(this.customer).subscribe({next: response =>{
      this.success = true;
      this.errors = [];    
      this.listCustomer();    
    }, error: ex => {
      if (ex.error.errors) {
        this.errors = ex.error.errors;
        this.success = false;
        ex.error.errors.forEach((element:any) => {         
        });
      } else {
          this.success = false;
          this.errors = ex.error.errors;        
      }
    }})
    }
  }

  public listCustomer() {
    this.customerService.list().subscribe((response: any) => {
      this.ELEMENT_DATA = response.result as Customer[];
      this.dataSource = new MatTableDataSource<Customer>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteCustomer(customer: Customer) {
    if (window.confirm('Deseja realmente excluir este cliente?')) {
      this.customerService.delete(customer.idCustomer).subscribe((response: any) => {
        this.message = response.result.result as string;
        window.alert(this.message);
        this.listCustomer();
      });
    }
  }

  findCustomer(customer: Customer) {    
    this.customerService.findById(customer.idCustomer).subscribe((response: any) => {
      this.customer = response.result as Customer;
      const datePipe = new DatePipe('en-US')
      var date = this.customer.birthdateCustomer
      var newDate = date.split("/").reverse().join("-");
      //datePipe.transform(this.customer.birthdateCustomer, 'YYYY-MM-dd')
    this.customer.birthdateCustomer = newDate
    });
  }

}