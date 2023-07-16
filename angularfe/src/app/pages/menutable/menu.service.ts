import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../usertable/user.model';
import { Menu } from './menu.model';
import { Role } from '../roletable/role.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private baseURL = 'http://localhost:8080/api/crud/menu';

  constructor(private httpClient: HttpClient) {}
  getMenuList(): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(`${this.baseURL}`);
  }
  createMenu(menu: Menu): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, menu);
  }
  getMenuById(id: number): Observable<Menu> {
    return this.httpClient.get<Menu>(`${this.baseURL}/getbyid/${id}`);
  }
  updateMenuById(id: number, menu: Menu): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/update/${id}`, menu);
  }
  deleteMenu(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
  getMenuByRole(role: string): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(`${this.baseURL}/${role}`);
  }

  updateMenuByRole(role: string, menuIds: number[]): Observable<Menu[]> {
    return this.httpClient.put<Menu[]>(`${this.baseURL}/${role}`, menuIds);
  }
}
