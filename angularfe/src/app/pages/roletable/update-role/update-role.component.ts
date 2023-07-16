import { Component, OnInit } from '@angular/core';
import { Role } from '../role.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css'],
})
export class UpdateRoleComponent implements OnInit {
  id!: number;
  role: Role = new Role();
  roleId: number | undefined;
  // selectedRoles: string[] = [];

  constructor(
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.roleService.getRoleById(this.roleId).subscribe((data) => {
      this.role = data;
      this.id = this.role.id; // Cập nhật giá trị id từ role lấy được
    });
  }

  saveRole() {
    // this.menu.roles = this.selectedRoles.map(roleName => ({ name: roleName }));
    this.roleService.updateRole(this.id, this.role).subscribe(
      (data) => {
        console.log(data);
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
