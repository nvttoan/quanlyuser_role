import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css'],
})
export class UsertableComponent implements OnInit {
  size = 5;
  page = 1;
  visible = false;
  isModalVisible = false;
  userIdToDelete: number | undefined;
  users: User[] | undefined;
  copiedUsers: User[] = [];
  modalRef: NzModalRef | undefined;
  total: number = 0;
  totalUsers: number = 0;
  searchForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: NzModalService
  ) {}
  ngOnInit(): void {
    this.getUsers();
    this.getTotalUser();
  }
  private getUsers(): void {
    // const { id, username } = this.searchForm.value;
    this.userService.getUserList(this.page, this.size).subscribe((users) => {
      this.users = users;
      this.total = users.length;
    });
  }
  private getTotalUser(): void {
    this.userService.getTotalUsers().subscribe((total) => {
      this.totalUsers = total;
    });
  }

  onChangePage(page: number) {
    this.page = page;
    this.getUsers();
  }

  onChangeSizePage(size: number) {
    this.page = 1;
    this.size = size;
    this.getUsers();
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
  openDeleteModal(userId: number) {
    this.isModalVisible = true;
    this.userIdToDelete = userId;
  }

  closeDeleteModal() {
    this.isModalVisible = false;
    this.userIdToDelete = undefined;
  }

  deleteUserConfirmed() {
    if (this.userIdToDelete) {
      this.userService.deleteUser(this.userIdToDelete).subscribe(() => {
        console.log('User deleted');
        this.isModalVisible = false;
        this.userIdToDelete = undefined;
        this.getUsers();
      });
    }
  }
  openAddModal(): void {
    this.modalRef = this.modalService.create({
      nzTitle: 'add user',
      nzContent: CreateUserComponent,
      nzFooter: null,
    });
  }
}
