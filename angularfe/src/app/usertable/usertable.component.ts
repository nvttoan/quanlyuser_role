import { UserService } from './../_services/user.service';
import { EmployeeService } from './../_services/employee.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit {

  users: User[] | undefined;
  constructor(private userService: UserService, private router:Router){

  }
  ngOnInit(): void {
      this.getUser();
      
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
