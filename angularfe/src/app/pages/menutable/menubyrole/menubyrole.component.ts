import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../menu.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Menu } from 'src/app/pages/menutable/menu.model';
import { Role } from '../../roletable/role.model';
import { RoleService } from '../../roletable/role.service';

@Component({
  selector: 'app-menubyrole',
  templateUrl: './menubyrole.component.html',
  styleUrls: ['./menubyrole.component.css'],
})
export class EditMenubyroleComponent implements OnInit {
  menuByRole: { [key: string]: Menu[] | undefined } = {};
  showTables: { [key: string]: boolean } = {};
  isVisible = false;
  currentRole: string;
  listOfOption: string[] = [];
  listOfSelectedValue = [];
  selectedMenuIds: number[] = [];
  menus: Menu[] | undefined;
  roles: string[] = [];

  constructor(
    private menuService: MenuService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.getNameRoles();
    this.fetchMenuByRole();
    this.getMenu();
  }
  getNameRoles(): void {
    this.roleService.getRoleList().subscribe((roles: Role[]) => {
      this.roles = roles.map((role: Role) => role.name);
      this.fetchMenuByRole();
    });
  }

  private getMenu() {
    this.menuService.getMenuList().subscribe((data) => {
      this.menus = data;
    });
  }
  fetchMenuByRole(): void {
    for (const role of this.roles) {
      this.menuService.getMenuByRole(role).subscribe(
        (menus: Menu[]) => {
          this.menuByRole[role] = menus;
        },
        (error) => {
          console.log(error);
          this.menuByRole[role] = [];
        }
      );
    }
  }

  //modal
  showModal(role: string) {
    this.currentRole = role;
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.menuService
      .updateMenuByRole(this.currentRole, this.selectedMenuIds)
      .subscribe(
        (menus: Menu[]) => {
          this.menuByRole[this.currentRole] = menus;
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
