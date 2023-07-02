import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user: User = new User();
  selectedRoles: string[] = [];

  constructor(private userService: UserService, private router: Router) { }

  roleOptions: { name: string }[] = [
    { name: 'ROLE_USER' },
    { name: 'ROLE_MODERATOR' },
    { name: 'ROLE_ADMIN' }
  ];

  ngOnInit(): void {
    this.user.roles = [];
  }
  

  saveUser() {
    this.user.roles = this.selectedRoles.map(roleName => ({ name: roleName }));

    this.userService.CreateUser(this.user).subscribe(
      data => {
        console.log(data);
        window.location.reload();
      },
      error => {
        console.error(error);
      }
    );
  }

  // gotoUserList() {
  //   this.router.navigate(['/usertable']);
  // }

  onSubmit() {
    console.log(this.user);
    this.saveUser();
  }
}
