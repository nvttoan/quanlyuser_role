import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../../model/employee.model';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  isModalVisible = false;
  employeeIdToDelete: number | undefined;
  employees: Employee[] | undefined;
  totalItems: number = 0;
  currentPageIndex: number = 1;
  
  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees(): void {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
      this.totalItems = this.employees.length;
    });
  }

  employeeDetails(id: number): void {
    this.router.navigate(['employee-details', id]);
  }

  updateEmployee(id: number): void {
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(data => {
      console.log(data);
      this.getEmployees();
    });
  }
  
  // Modal
  openModal(employeeId: number): void {
    this.isModalVisible = true;
    this.employeeIdToDelete = employeeId;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.employeeIdToDelete = undefined;
  }

  deleteEmployeeConfirmed(): void {
    if (this.employeeIdToDelete) {
      this.employeeService.deleteEmployee(this.employeeIdToDelete).subscribe(() => {
        console.log("Employee deleted");
        this.isModalVisible = false;
        this.employeeIdToDelete = undefined;
        this.getEmployees();
      });
    }
  }

  pageIndexChanged(index: number): void {
    this.currentPageIndex = index;
  }
}
