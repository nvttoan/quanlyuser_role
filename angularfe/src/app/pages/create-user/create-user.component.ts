import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user: User = new User();
  constructor(private userService: UserService,
    private router: Router){
    
  }
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  ngOnInit(): void{
  }
  roleOptions: { name: string }[] = [
    { name: 'ROLE_USER' },
    { name: 'ROLE_MODERATOR' },
    { name: 'ROLE_ADMIN' }
  ];
  saveUser(){
    this.userService.createUser(this.user).subscribe(data =>{
      console.log(data);
      this.gotoEmployeeList();
    }),
    console.error();
    
  }
  gotoEmployeeList(){
    this.router.navigate(['/admin']);
  }
  onSubmit(){
    console.log(this.user);
    this.saveUser()
  }
}
