import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Customer } from '../model/customer';
import { API_CONFIG } from 'src/config/api_config';

@Injectable()
export class CustomerService {
    url = API_CONFIG.urlApi
  constructor(private http: HttpClient) {}
  save (customer: Customer) : Observable<Customer[]> {
    return this.http.post<Customer[]>(this.url+'/customer/insert', customer);
  }

  list() : Observable<Customer[]>{
  return this.http.get<Customer[]>(this.url+'/customer/list');
}

  delete(idCustomer:any) : Observable<Customer[]>{
  return this.http.delete<Customer[]>(`${this.url}/customer/delete/${idCustomer}`);
}

  findById(idCustomer: any): Observable<Customer> {
  return this.http.get<any>(`${this.url}/customer/findCustomer/${idCustomer}`);
}

  update(customer: Customer) : Observable<Customer>{
    return this.http.put<Customer>(this.url+'/customer/update', customer);
  }
}