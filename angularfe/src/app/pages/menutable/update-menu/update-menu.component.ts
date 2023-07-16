import { RoleService } from './../../roletable/role.service';
import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu.model';
import { MenuService } from '../menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role, IRole } from '../../roletable/role.model';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css'],
})
export class UpdateMenuComponent implements OnInit {
  id!: number;
  menu: Menu = new Menu();
  menuId: number | undefined;
  selectedRoles: string[] = [];
  roles: Role[] | undefined;

  constructor(
    private menuService: MenuService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getNameRoles();
    this.menuService.getMenuById(this.menuId).subscribe((data) => {
      this.menu = data;
      this.id = this.menu.id;
    });
  }
  private getNameRoles(): void {
    this.roleService.getRoleList().subscribe((roles) => {
      this.roles = roles;
    });
  }

  saveMenu() {
    this.menu.roles = this.selectedRoles.map((roleName) => ({
      name: roleName,
    }));
    this.menuService.updateMenuById(this.id, this.menu).subscribe(
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
