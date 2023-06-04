import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../_services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  employees: Employee[] | undefined;
  constructor(private employeeService: EmployeeService, private router:Router){

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
  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe(data =>{
      console.log(data);
      this.getEmployees();
    })
  }
//   currentPage = 1; // Trang hiện tại
//   pageSize = 7;
//   displayedEmployees: any[] = []; ;
//   onPageChange(page: number) {
//     this.currentPage = page;
//     this.updateDisplayedEmployees();
//   }
//   updateDisplayedEmployees() {
//     const startIndex = (this.currentPage - 1) * this.pageSize;
//     const endIndex = startIndex + this.pageSize;
//     this.displayedEmployees = this.employees.slice(startIndex, endIndex);
//   }
//   onPageSizeChange(pageSize: number) {
//     this.pageSize = pageSize;
//     this.currentPage = 1;
//     this.updateDisplayedEmployees();
//   }
}
