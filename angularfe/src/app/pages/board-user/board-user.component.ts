import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../board-admin/employee.service';
import { Employee } from '../board-admin/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  employees: Employee[] | undefined;
  constructor(private employeeService: EmployeeService, private router:Router){

  }
  onLogout() {
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
      this.getEmployees();
      
  }
  private getEmployees(){
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    })
  }
  
  employeeDetails(id:number){
    this.router.navigate(['employee-details', id]);

  }
  updateEmployee(id: number){
    this.router.navigate(['update-employee', id]);
  }
  
}
