import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { OrderConfirmationRoutingModule } from './order-confirmation-routing.module';
import { OrderConfirmationComponent } from './order-confirmation.component';

@NgModule({
  declarations: [OrderConfirmationComponent],
  imports: [CommonModule, OrderConfirmationRoutingModule, MaterialModule],
})
export class OrderConfirmationModule {}
