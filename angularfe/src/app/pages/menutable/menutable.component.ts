import { Component, OnInit } from '@angular/core';
import { Menu } from './menu.model';
import { MenuService } from './menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menutable',
  templateUrl: './menutable.component.html',
  styleUrls: ['./menutable.component.css']
})
export class MenutableComponent implements OnInit {
  id!: number;
  menus: Menu[] | undefined;
  menuIdToDelete: number | undefined;
  visible = false;
  isModalVisible = false;

  constructor(private menuService: MenuService, private router:Router) { }

  ngOnInit(): void {
    this.getMenu();
  }
  private getMenu(){
    this.menuService.getMenuList().subscribe(data => {
      this.menus = data;
    })
  }
  menuDetails(id:number){
    this.router.navigate(['user-details', id]);

  }
  updateMenu(id: number){
    this.router.navigate(['update-menu', id]);
  }
  deleteMenu(id: number){
    this.menuService.deleteMenu(id).subscribe(data =>{
      console.log(data);
      this.getMenu();
    })
  }
  //modal
  openModal(userId: number) {
    this.isModalVisible = true;
    this.menuIdToDelete = userId;
  }
  
  closeModal() {
    this.isModalVisible = false;
    this.menuIdToDelete = undefined;
  }
  
  deleteUserConfirmed() {
    if (this.menuIdToDelete) {
      this.menuService.deleteMenu(this.menuIdToDelete).subscribe(() => {
        console.log("User deleted");
        this.isModalVisible = false;
        this.menuIdToDelete = undefined;
        this.getMenu();
      });
    }
  }
  
}
