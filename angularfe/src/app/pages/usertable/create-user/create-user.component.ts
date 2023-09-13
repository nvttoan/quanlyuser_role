import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Role } from '../../roletable/role.model';
import { RoleService } from '../../roletable/role.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  user: User = new User();
  selectedRoles: string[] = [];
  roles: Role[] | undefined;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getNameRoles();
    this.user.roles = [];
  }
  private getNameRoles(): void {
    this.roleService.getRoleList().subscribe((roles) => {
      this.roles = roles;
    });
  }

  saveUser() {
    this.user.roles = this.selectedRoles.map((roleName) => ({
      name: roleName,
    }));

    this.userService.CreateUser(this.user).subscribe(
      (data) => {
        console.log(data);
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit() {
    console.log(this.user);
    this.saveUser();
  }
}
