import { Employee, IEmployee } from './employee.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseAPI } from 'src/app/_utils/response.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseURL = "http://localhost:8080/api/crud/employees";

  constructor(private httpClient: HttpClient) { }
  getEmployeesList(page: number = 1, size: number = 5): Observable<any> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));
  
    return this.httpClient.get<any>(`${this.baseURL}`, { params });
  }
  // trả về mảng các employee của page 1
  getTotalEmployees(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseURL}/total`);
  }
  //trả về tổng tất cả employee
  
  //crud
  CreateEmployee(employee: Employee):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,employee);
  }
  getEmployeeById(id: number):Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);
  }
  updateEmployee(id: number,employee: Employee):Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,employee);
  }
  deleteEmployee(id: number):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}