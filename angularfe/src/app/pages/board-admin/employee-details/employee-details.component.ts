import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  id!: number;
  employee!: Employee;
  employeeId: number | undefined;
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}
  ngOnInit(): void {
    if (this.employeeId) {
      this.employeeService
        .getEmployeeById(this.employeeId)
        .subscribe((data) => {
          this.employee = data;
        });
    }
  }
}
