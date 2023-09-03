import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { MoreDetailsComponent } from './more-details/more-details.component';
import { CustomerReviewsComponent } from './customer-reviews/customer-reviews.component';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    MoreDetailsComponent,
    CustomerReviewsComponent,
  ],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    SharedModule,
    MaterialModule,
  ],
})
export class ProductDetailsModule {}
