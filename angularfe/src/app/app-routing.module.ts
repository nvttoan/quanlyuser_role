import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BoardUserComponent } from './pages/board-user/board-user.component';
import { BoardModeratorComponent } from './pages/board-moderator/board-moderator.component';
import { BoardAdminComponent } from './pages/board-admin/board-admin.component';
import { CreateEmployeeComponent } from './pages/board-admin/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './pages/board-admin/update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './pages/board-admin/employee-details/employee-details.component';
import { UsertableComponent } from './pages/usertable/usertable.component';
import { UpdateUserComponent } from './pages/usertable/update-user/update-user.component';
import { MenutableComponent } from './pages/menutable/menutable.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CreateUserComponent } from './pages/usertable/create-user/create-user.component';
import { CreateMenuComponent } from './pages/menutable/create-menu/create-menu.component';
import { UpdateMenuComponent } from './pages/menutable/update-menu/update-menu.component';
import { EditMenubyroleComponent } from './pages/menutable/menubyrole/menubyrole.component';
import { ChangepassComponent } from './pages/changepass/changepass.component';
import { RoletableComponent } from './pages/roletable/roletable.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.homeModule),
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'user', component: BoardUserComponent, canActivate: [AuthGuard] },
  {
    path: 'menutable',
    component: MenutableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'menutable/create-menu',
    component: CreateMenuComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'menutable/menubyrole',
    component: EditMenubyroleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'changepass',
    component: ChangepassComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'roletable',
    component: RoletableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'moderator',
    component: BoardModeratorComponent,
    canActivate: [AuthGuard],
  },
  { path: 'admin', component: BoardAdminComponent, canActivate: [AuthGuard] },
  {
    path: 'usertable',
    component: UsertableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-user/:id',
    component: UpdateUserComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
