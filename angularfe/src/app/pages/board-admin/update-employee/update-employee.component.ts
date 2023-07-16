import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  id!: number;
  employee: Employee = new Employee();
  employeeId: number | undefined;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
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
  saveEmployee() {
    this.employeeService.CreateEmployee(this.employee).subscribe((data) => {
      console.log(data);
      window.location.reload();
    }),
      console.error();
  }
}
