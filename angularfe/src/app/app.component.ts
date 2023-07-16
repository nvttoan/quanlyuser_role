import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { EventBusService } from './_shared/event-bus.service';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';
import { Menu } from './pages/menutable/menu.model';
import { MenuService } from 'src/app/pages/menutable/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'DemoApp';
  isCollapsed = false;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  eventBusSub?: Subscription;
  menus: Menu[] = [];

  constructor(
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
    this.getMenu();
  }
  private getMenu() {
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.menuService.getMenuByRole(user.roles).subscribe((data) => {
        this.menus = data;
      });
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        window.location.reload();

        window.location.href = '/home';

        this.storageService.clean();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
