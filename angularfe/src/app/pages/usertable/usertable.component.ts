import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CreateUserComponent } from './create-user/create-user.component';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit {
  currentPage = 1;
  totalItems = 0;
  pageSize = 5;
  searchValue = '';
  visible = false;
  isModalVisible = false;
  userIdToDelete: number | undefined;
  users: User[] | undefined ;
  copiedUsers: User[] = [];
  modalRef: NzModalRef | undefined;

  
  constructor(private userService: UserService, private router:Router,private modalService: NzModalService){

  }
  ngOnInit(): void {
      this.getUser();
      
  }
  private getUser() {
    this.userService.getUserList().subscribe(data => {
      this.users = data;
      this.totalItems = this.users?.length || 0; // Cập nhật tổng số dòng dữ liệu
      this.updateCopiedUsers();
    });
  }
  
  userDetails(id:number){
    this.router.navigate(['user-details', id]);

  }
  updateUser(id: number){
    this.router.navigate(['update-user', id]);
  }
  deleteUser(id: number){
    this.userService.deleteUser(id).subscribe(data =>{
      console.log(data);
      this.getUser();
    })
  }
  //search
  updateCopiedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.copiedUsers = this.users?.slice(startIndex, endIndex) || [];
  }
  
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.currentPage = 1; // Đặt lại trang hiện tại về 1
    this.copiedUsers = this.users?.filter((item: User) => item.username.includes(this.searchValue)) || [];
    this.totalItems = this.copiedUsers.length; // Cập nhật tổng số dòng dữ liệu sau khi lọc
    this.updateCopiedUsers();
  }
  
  
//modal
openModal(userId: number) {
  this.isModalVisible = true;
  this.userIdToDelete = userId;
}

closeModal() {
  this.isModalVisible = false;
  this.userIdToDelete = undefined;
}

deleteUserConfirmed() {
  if (this.userIdToDelete) {
    this.userService.deleteUser(this.userIdToDelete).subscribe(() => {
      console.log("User deleted");
      this.isModalVisible = false;
      this.userIdToDelete = undefined;
      this.getUser();
    });
  }
}
openAddModal(): void {
  this.modalRef = this.modalService.create({
    nzTitle: 'add user',
    nzContent: CreateUserComponent,
    nzFooter: null
  });
}
}
