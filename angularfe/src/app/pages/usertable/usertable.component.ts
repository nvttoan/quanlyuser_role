import { UserService } from './user.service';
import { EmployeeService } from '../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit {
  isModalVisible = false;
  userIdToDelete: number | undefined;
  users: User[] | undefined;
  constructor(private userService: UserService, private router:Router){

  }
  ngOnInit(): void {
      this.getUser();
      
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
  
  private getUser(){
    this.userService.getUserList().subscribe(data => {
      this.users = data;
    })
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

}
