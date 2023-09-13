import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';
import { Employee, IEmployee } from './employee.model';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { getDataInForm } from 'src/app/_utils/form-util';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css'],
})
export class BoardAdminComponent implements OnInit {
  size = 5;
  page = 1;
  isModalVisible = false;
  employeeIdToDelete: number | undefined;
  employee: Employee = new Employee();
  employees: IEmployee[] | undefined;
  modalRef: NzModalRef | undefined;
  employeeId: number;
  total: number = 0;
  totalEmployees: number = 0;

  searchForm: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private modalService: NzModalService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      id: [''], // Thêm tất cả các trường tìm kiếm ở đây
      firstName: [''],
      lastName: [''],
      age: [''],
      email: [''],
    });
  }

  ngOnInit(): void {
    this.getEmployees();
    this.getTotalEmployees();
  }

  private getEmployees(): void {
    const { id, email } = this.searchForm.value;
    this.employeeService
      .getEmployeesList(this.page, this.size)
      .subscribe((employees) => {
        this.employees = employees;
        this.total = employees.length;
      });
  }
  private getTotalEmployees(): void {
    this.employeeService.getTotalEmployees().subscribe((total) => {
      this.totalEmployees = total;
    });
  }

  onChangePage(page: number) {
    this.page = page;
    this.getEmployees();
  }

  onChangeSizePage(size: number) {
    this.page = 1;
    this.size = size;
    this.getEmployees();
  }

  resetForm(): void {
    this.searchForm.reset();
  }

  //modal
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
      this.employeeService
        .deleteEmployee(this.employeeIdToDelete)
        .subscribe(() => {
          console.log('Employee deleted');
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
      nzFooter: null,
    });
  }

  openAddModal(): void {
    this.modalRef = this.modalService.create({
      nzTitle: 'add employee',
      nzContent: CreateEmployeeComponent,
      nzFooter: null,
    });
    this.modalRef.afterClose.subscribe(() => {
      this.getEmployees();
    });
  }

  openUpdateModal(id: number): void {
    this.employeeId = id;
    this.modalRef = this.modalService.create({
      nzTitle: 'Update',
      nzContent: UpdateEmployeeComponent,
      nzComponentParams: { employeeId: this.employeeId },
      nzFooter: null,
    });
    this.modalRef.afterClose.subscribe(() => {
      this.getEmployees();
    });
  }
}
