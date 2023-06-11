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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {path: 'home', loadChildren: ()=> import('./pages/home/home.module').then(m => m.homeModule)},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard] },
  { path: 'user', component: BoardUserComponent ,canActivate: [AuthGuard]},
  { path: 'menutable', component: MenutableComponent,canActivate: [AuthGuard] },

  { path: 'moderator', component: BoardModeratorComponent,canActivate: [AuthGuard] },
  { path: 'admin', component: BoardAdminComponent ,canActivate: [AuthGuard]},
  {path:'admin/create-employees', component: CreateEmployeeComponent,canActivate: [AuthGuard]},
  {path: 'update-employee/:id', component: UpdateEmployeeComponent,canActivate: [AuthGuard]},
  {path: 'employee-details/:id',component: EmployeeDetailsComponent,canActivate: [AuthGuard]},
  {path: 'usertable', component: UsertableComponent,canActivate: [AuthGuard]},
  {path: 'update-user/:id', component: UpdateUserComponent,canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
