import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../../model/employee.model';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  isModalVisible = false;
  employeeIdToDelete: number | undefined;
  employee: Employee = new Employee();
  employees: Employee[] | undefined;
  modalRef: NzModalRef | undefined;
  employeeId: number;
  constructor(private employeeService: EmployeeService, private router: Router,private modalService: NzModalService,) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees(): void {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    });
  }

  // employeeDetails(id: number): void {
  //   this.router.navigate(['employee-details', id]);
  // }

  // updateEmployee(id: number): void {
  //   this.router.navigate(['update-employee', id]);
  // }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(data => {
      console.log(data);
      this.getEmployees();
    });
  }
  
  //Modal
  openDeleteModal(employeeId: number): void {
    this.isModalVisible = true;
    this.employeeIdToDelete = employeeId;
  }

  closeDeleteModal(): void {
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
  
  openViewModal(id: number): void {
    this.employeeId = id;
    this.modalRef = this.modalService.create({
      nzTitle: 'Employee Details',
      nzContent: EmployeeDetailsComponent,
      nzComponentParams: { employeeId: this.employeeId }, 
      nzFooter: null
    });
  }
  
  openAddModal(): void {
    this.modalRef = this.modalService.create({
      nzTitle: 'add employee',
      nzContent: CreateEmployeeComponent,
      nzFooter: null
    });
  }
  openUpdateModal(id: number): void {
    this.employeeId = id;
    this.modalRef = this.modalService.create({
      nzTitle: 'Update',
      nzContent: UpdateEmployeeComponent,
      nzComponentParams: { employeeId: this.employeeId }, 
      nzFooter: null
    });
  }
}
