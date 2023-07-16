import { CreateRoleComponent } from './pages/roletable/create-role/create-role.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './share-module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UpdateEmployeeComponent } from './pages/board-admin/update-employee/update-employee.component';
import { CreateEmployeeComponent } from './pages/board-admin/create-employee/create-employee.component';
import { BoardModeratorComponent } from './pages/board-moderator/board-moderator.component';
import { BoardAdminComponent } from './pages/board-admin/board-admin.component';
import { BoardUserComponent } from './pages/board-user/board-user.component';
import { UsertableComponent } from './pages/usertable/usertable.component';
import { UpdateUserComponent } from './pages/usertable/update-user/update-user.component';
import { CreateUserComponent } from './pages/usertable/create-user/create-user.component';
import { MenutableComponent } from './pages/menutable/menutable.component';
import { CreateMenuComponent } from './pages/menutable/create-menu/create-menu.component';
import { UpdateMenuComponent } from './pages/menutable/update-menu/update-menu.component';
import { EditMenubyroleComponent } from './pages/menutable/menubyrole/menubyrole.component';
import { ChangepassComponent } from './pages/changepass/changepass.component';
import { RoletableComponent } from './pages/roletable/roletable.component';
import { UpdateRoleComponent } from './pages/roletable/update-role/update-role.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UpdateEmployeeComponent,
    CreateEmployeeComponent,
    BoardModeratorComponent,
    BoardAdminComponent,
    BoardUserComponent,
    UsertableComponent,
    UpdateUserComponent,
    CreateUserComponent,
    MenutableComponent,
    CreateMenuComponent,
    UpdateMenuComponent,
    EditMenubyroleComponent,
    ChangepassComponent,
    RoletableComponent,
    CreateRoleComponent,
    UpdateRoleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,

    ReactiveFormsModule,
    NzInputModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
