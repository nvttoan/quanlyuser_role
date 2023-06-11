import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BoardUserComponent } from './pages/board-user/board-user.component';
import { BoardModeratorComponent } from './pages/board-moderator/board-moderator.component';
import { BoardAdminComponent } from './pages/board-admin/board-admin.component';
import { CreateEmployeeComponent } from './pages/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './pages/update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './pages/employee-details/employee-details.component';
import { UsertableComponent } from './pages/usertable/usertable.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { MenutableComponent } from './pages/menutable/menutable.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path: 'home', loadChildren: ()=> import('./pages/home/home.module').then(m => m.homeModule)},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'menutable', component: MenutableComponent },

  { path: 'moderator', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  {path:'admin/create-employees', component: CreateEmployeeComponent},
  {path: 'update-employee/:id', component: UpdateEmployeeComponent},
  {path: 'employee-details/:id',component: EmployeeDetailsComponent},
  {path: 'usertable', component: UsertableComponent},
  {path: 'update-user/:id', component: UpdateUserComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
