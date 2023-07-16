import { Component, OnInit } from '@angular/core';
import { Role } from '../role.model';
import { RoleService } from '../role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css'],
})
export class CreateRoleComponent implements OnInit {
  role: Role = new Role();
  selectedRoles: string[] = [];

  constructor(private roleService: RoleService, private router: Router) {}

  ngOnInit(): void {
    // this.user.roles = [];
  }

  saveRole() {
    // this.user.roles = this.selectedRoles.map(roleName => ({ name: roleName }));

    this.roleService.CreateRole(this.role).subscribe(
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
    console.log(this.role);
    this.saveRole();
  }
}
