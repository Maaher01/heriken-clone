import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductBrandService } from 'src/app/services/product-brand.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductSubCategoryService } from 'src/app/services/product-sub-category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  products: Product[];
  productData: any;
  errorResponse: any;

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productSubCategoryService: ProductSubCategoryService,
    private productBrandService: ProductBrandService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(filter?: any) {
    this.productService.getAllProducts(filter).subscribe({
      next: (res) => {
        this.productData = res;
        this.products = this.productData.data;
      },
      error: (err) => {
        this.errorResponse = err.error.message;
      },
    });
  }

  onCategoryCheckboxChange(categoryName: string) {
    this.getAllProducts({filter: {categoryName: categoryName}});
  }

  onSubCategoryCheckboxChange(subCategoryName: string) {
    this.getAllProducts({filter: {subCategoryName: subCategoryName}});
  }

  onBrandCheckboxChange(brandName: string) {
    this.getAllProducts({filter: {brandName: brandName}});
  }

  productCategories$ = this.productCategoryService.getAllCategories().pipe(
    map((res) => {
      return res.data;
    })
  );

  productSubCategories$ = this.productSubCategoryService
    .getAllSubCategories()
    .pipe(
      map((res) => {
        return res.data;
      })
    );

  productBrands$ = this.productBrandService.getAllBrands().pipe(
    map((res) => {
      return res.data;
    })
  );
}
