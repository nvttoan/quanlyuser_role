import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = "http://localhost:8080/api/crud/user";

  constructor(private httpClient: HttpClient) { }
  // trả về mảng các employee của page 1
  getUserList(page: number = 1, size: number = 5): Observable<any> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));
  
    return this.httpClient.get<any>(`${this.baseURL}`, { params });
  }
  //tổng user
  getTotalUsers(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseURL}/total`);
  }
  CreateUser(user: User):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,user);
  }
  getUserById(id: number):Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}/${id}`);
  }
  updateUser(id: number,user: User):Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,user);
  }
  deleteUser(id: number):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}