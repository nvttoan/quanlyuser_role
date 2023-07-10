import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu.model';
import { MenuService } from '../menu.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css']
})
export class UpdateMenuComponent implements OnInit {

  id!: number;
  menu: Menu = new Menu();
  menuId: number | undefined;
  selectedRoles: string[] = [];


  roleOptions: { name: string }[] = [
    { name: 'ROLE_USER' },
    { name: 'ROLE_MODERATOR' },
    { name: 'ROLE_ADMIN' }
  ];
  constructor(private menuService: MenuService,
    private route: ActivatedRoute,private router: Router){

  }
  ngOnInit(): void {
    this.menuService.getMenuById(this.menuId).subscribe(data => {
      this.menu = data;
      this.id = this.menu.id; // Cập nhật giá trị id từ menu lấy được
    });
  }
  
  
  saveMenu() {
    this.menu.roles = this.selectedRoles.map(roleName => ({ name: roleName }));
    this.menuService.updateMenuById(this.id, this.menu).subscribe(
      data => {
        console.log(data);
        window.location.reload();
      },
      error => {
        console.error(error);
      }
    );
  }
  
}
