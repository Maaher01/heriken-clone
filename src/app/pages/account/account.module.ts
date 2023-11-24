import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { AccountComponent } from './account.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { EditInfoComponent } from './edit-info/edit-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BasicInfoComponent,
    AccountComponent,
    EditInfoComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
