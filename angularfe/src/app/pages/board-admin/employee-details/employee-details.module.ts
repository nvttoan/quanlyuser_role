import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';

import { EmployeeDetailsComponent } from './employee-details.component';
import { SharedModule } from '../../../share-module';

@NgModule({
  declarations: [EmployeeDetailsComponent],
  imports: [CommonModule,SharedModule,NzCardModule],
  exports: [EmployeeDetailsComponent],
})
export class EmployeeDetailsModule {}
