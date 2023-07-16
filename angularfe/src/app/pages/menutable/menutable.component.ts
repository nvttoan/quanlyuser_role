import { Component, OnInit } from '@angular/core';
import { Menu } from './menu.model';
import { MenuService } from './menu.service';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { UpdateMenuComponent } from './update-menu/update-menu.component';

@Component({
  selector: 'app-menutable',
  templateUrl: './menutable.component.html',
  styleUrls: ['./menutable.component.css'],
})
export class MenutableComponent implements OnInit {
  id!: number;
  menus: Menu[] | undefined;
  menuIdToDelete: number | undefined;
  visible = false;
  isModalVisible = false;
  modalRef: NzModalRef | undefined;
  menuId: number;

  constructor(
    private menuService: MenuService,
    private router: Router,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.getMenu();
  }
  private getMenu() {
    this.menuService.getMenuList().subscribe((menus) => {
      this.menus = menus;
    });
  }
  menuDetails(id: number) {
    this.router.navigate(['user-details', id]);
  }
  updateMenu(id: number) {
    this.router.navigate(['update-menu', id]);
  }
  deleteMenu(id: number) {
    this.menuService.deleteMenu(id).subscribe((data) => {
      console.log(data);
      this.getMenu();
    });
  }
  //modal
  openUpdateModal(id: number): void {
    this.menuId = id;
    this.modalRef = this.modalService.create({
      nzTitle: 'Update',
      nzContent: UpdateMenuComponent,
      nzComponentParams: { menuId: this.menuId },
      nzFooter: null,
    });
    this.modalRef.afterClose.subscribe(() => {
      this.getMenu();
    });
  }

  openDeleteModal(userId: number) {
    this.isModalVisible = true;
    this.menuIdToDelete = userId;
  }

  closeDeleteModal() {
    this.isModalVisible = false;
    this.menuIdToDelete = undefined;
  }

  deleteUserConfirmed() {
    if (this.menuIdToDelete) {
      this.menuService.deleteMenu(this.menuIdToDelete).subscribe(() => {
        console.log('User deleted');
        this.isModalVisible = false;
        this.menuIdToDelete = undefined;
        this.getMenu();
      });
    }
  }
}
