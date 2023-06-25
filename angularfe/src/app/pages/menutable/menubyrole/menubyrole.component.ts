import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../menu.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Menu } from 'src/app/pages/menutable/menu.model';

@Component({
  selector: 'app-menubyrole',
  templateUrl: './menubyrole.component.html',
  styleUrls: ['./menubyrole.component.css']
}) 
export class EditMenubyroleComponent implements OnInit {
  roles: string[] = ['ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN'];
  menuByRole: { [key: string]: Menu[] } = {};
  showTables: { [key: string]: boolean } = {};
  isVisible = false;
  currentRole: string;
  listOfOption: string[] = [];
  listOfSelectedValue = [];
  selectedMenuIds: number[] = [];
  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    const children: string[] = [];
    for (let i = 1; i < 36; i++) {
      children.push(`${i}`);
    }
    this.listOfOption = children;
    this.fetchMenuByRole();
    
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
 
  toggleTable(role: string): void {
    this.showTables[role] = !this.showTables[role];
  }

  showModal(role: string) {
    this.currentRole = role;
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.menuService.updateMenuByRole(this.currentRole, this.selectedMenuIds).subscribe(
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
