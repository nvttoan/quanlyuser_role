import { Role, IRole } from './role.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseAPI } from 'src/app/_utils/response.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private baseURL = 'http://localhost:8080/api/crud';

  constructor(private httpClient: HttpClient) {}

  // trả về mảng các role của page 1
  getRolesListPage(page: number = 1, size: number = 5): Observable<any> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));

    return this.httpClient.get<any>(`${this.baseURL}/paginatedroles`, {
      params,
    });
  }
  // trả về tổng tất cả role
  getTotalRoles(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseURL}/gettotalroles`);
  }
  //crud
  getRoleList(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${this.baseURL}/rolelist`);
  }
  CreateRole(role: Role): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/addrole`, role);
  }
  getRoleById(id: number): Observable<Role> {
    return this.httpClient.get<Role>(`${this.baseURL}/getrole/${id}`);
  }
  updateRole(id: number, role: Role): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/updaterole/${id}`, role);
  }
  deleteRole(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/deleterole/${id}`);
  }
}
