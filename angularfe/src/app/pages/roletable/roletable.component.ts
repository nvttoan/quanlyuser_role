import { RoleService } from './role.service';
import { IRole, Role } from './role.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateRoleComponent } from './create-role/create-role.component';
import { UpdateRoleComponent } from './update-role/update-role.component';

@Component({
  selector: 'app-roletable',
  templateUrl: './roletable.component.html',
  styleUrls: ['./roletable.component.css'],
})
export class RoletableComponent implements OnInit {
  size = 5;
  page = 1;
  id!: number;

  roleIdToDelete: number | undefined;
  visible = false;
  isModalVisible = false;
  modalRef: NzModalRef | undefined;
  menuId: number;
  total: number = 0;
  totalRoles: number = 0;

  role: Role = new Role();
  roleId: number;

  roles: Role[] | undefined;
  searchForm: FormGroup;
  constructor(
    private roleService: RoleService,
    private router: Router,
    private modalService: NzModalService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      id: [''],
      email: [''],
    });
  }
  ngOnInit(): void {
    this.getRoles();
    this.getTotalRoles();
  }
  private getRoles(): void {
    const { id, email } = this.searchForm.value;
    this.roleService
      .getRolesListPage(this.page, this.size)
      .subscribe((roles) => {
        this.roles = roles;
        this.total = roles.length;
      });
  }
  private getTotalRoles(): void {
    this.roleService.getTotalRoles().subscribe((total) => {
      this.totalRoles = total;
    });
  }

  onChangePage(page: number) {
    this.page = page;
    this.getRoles();
  }

  onChangeSizePage(size: number) {
    this.page = 1;
    this.size = size;
    this.getRoles();
  }

  resetForm(): void {
    this.searchForm.reset();
  }

  search() {
    this.page = 1;
    this.onSearch();
  }

  getFromSearch() {}

  onSearch() {}

  //modal
  openAddModal(): void {
    this.modalRef = this.modalService.create({
      nzTitle: 'add role',
      nzContent: CreateRoleComponent,
      nzFooter: null,
    });
    this.modalRef.afterClose.subscribe(() => {
      this.getRoles();
    });
  }
  openUpdateModal(id: number): void {
    this.roleId = id;
    this.modalRef = this.modalService.create({
      nzTitle: 'Update',
      nzContent: UpdateRoleComponent,
      nzComponentParams: { roleId: this.roleId },
      nzFooter: null,
    });
    this.modalRef.afterClose.subscribe(() => {
      this.getRoles();
    });
  }

  openDeleteModal(roleId: number) {
    this.isModalVisible = true;
    this.roleIdToDelete = roleId;
  }

  closeDeleteModal() {
    this.isModalVisible = false;
    this.roleIdToDelete = undefined;
  }

  deleteRoleConfirmed() {
    if (this.roleIdToDelete) {
      this.roleService.deleteRole(this.roleIdToDelete).subscribe(() => {
        console.log('User deleted');
        this.isModalVisible = false;
        this.roleIdToDelete = undefined;
        this.getRoles();
      });
    }
  }
}
