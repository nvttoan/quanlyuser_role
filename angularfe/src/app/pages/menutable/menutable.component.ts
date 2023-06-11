import { Component, OnInit } from '@angular/core';
import { Menu } from '../../model/menu';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menutable',
  templateUrl: './menutable.component.html',
  styleUrls: ['./menutable.component.css']
})
export class MenutableComponent implements OnInit {
  id!: number;
  menus: Menu[] | undefined;
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
}
