import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/pages/board-admin/employee.model';
import { EmployeeService } from 'src/app/pages/board-admin/employee.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css'],
})
export class BoardModeratorComponent implements OnInit {
  employees: Employee[] | undefined;
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}
  onLogout() {
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
    this.getEmployees();
  }
  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe((data) => {
      this.employees = data;
    });
  }

  employeeDetails(id: number) {
    this.router.navigate(['employee-details', id]);
  }
  updateEmployee(id: number) {
    this.router.navigate(['update-employee', id]);
  }
}
