import { Component } from '@angular/core';
import { map } from 'rxjs';
import { ProductBrandService } from 'src/app/services/product-brand.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductSubCategoryService } from 'src/app/services/product-sub-category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent {

  products$ = this.productService.getAllProducts().pipe(
    map((res) => {
      return res.data;
    })
  );

  productCategories$ = this.productCategoryService.getAllCategories().pipe(
    map((res) => {
      return res.data;
    })
  );

  productSubCategories$ = this.productSubCategoryService.getAllSubCategories().pipe(
    map((res) => {
      return res.data;
    })
  );

  productBrands$ = this.productBrandService.getAllBrands().pipe(
    map((res) => {
      return res.data;
    })
  );

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productSubCategoryService: ProductSubCategoryService,
    private productBrandService: ProductBrandService,
  ) {}
}
