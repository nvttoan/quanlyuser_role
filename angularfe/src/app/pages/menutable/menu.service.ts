import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../usertable/user.model';
import { Menu } from './menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseURL = "http://localhost:8080/api/crud/menu";

  constructor(private httpClient: HttpClient) { }
  getMenuList(): Observable<Menu[]>{
    return this.httpClient.get<Menu[]>(`${this.baseURL}`);
  }
  CreateMenu(menu: Menu):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,menu);
  }
  getMenuById(id: number):Observable<Menu>{
    return this.httpClient.get<Menu>(`${this.baseURL}/${id}`);
  }
  updateMenu(id: number,menu: Menu):Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,menu);
  }
  deleteMenu(id: number):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}