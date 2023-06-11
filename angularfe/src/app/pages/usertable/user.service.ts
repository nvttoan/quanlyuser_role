import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = "http://localhost:8080/api/crud/user";

  constructor(private httpClient: HttpClient) { }
  getUserList(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}`);
  }
  createUser(user: User): Observable<Object> {
    const rolesArray = user.roles.map(roles => roles.name);

    const requestBody = {
      ...user,
      'roles[]': rolesArray
    };

    return this.httpClient.post(this.baseURL, requestBody);
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