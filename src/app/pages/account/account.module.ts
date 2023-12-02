import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { AccountComponent } from './account.component';
import { MaterialModule } from 'src/app/material/material.module';
import { EditInfoComponent } from './edit-info/edit-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderListComponent } from './order-list/order-list.component';

@NgModule({
  declarations: [BasicInfoComponent, AccountComponent, EditInfoComponent, OrderListComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AccountModule {}
