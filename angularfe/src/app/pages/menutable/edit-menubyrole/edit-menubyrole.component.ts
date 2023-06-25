import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../menu.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Menu } from 'src/app/pages/menutable/menu.model';

@Component({
  selector: 'app-edit-menubyrole',
  templateUrl: './edit-menubyrole.component.html',
  styleUrls: ['./edit-menubyrole.component.css']
}) 
export class EditMenubyroleComponent implements OnInit {
  roles: string[] = ['ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN'];
  menuByRole: { [key: string]: Menu[] } = {};
  showTables: { [key: string]: boolean } = {};
  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
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

  // openEditMenuModal(role: string): void {
  //   this.selectedRole = role;
  //   this.menuService.getMenuList().subscribe(
  //     (menus: Menu[]) => {
  //       this.allMenus = menus;
  //       this.showEditMenuModal();
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  // showEditMenuModal(): void {
  //   this.modalService.create({
  //     nzTitle: 'Edit Menu',
      
  //   }
  //   );
  // }

  // updateMenuByRole(): void {
   
  // }
}
