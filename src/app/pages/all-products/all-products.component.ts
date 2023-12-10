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
  filter: any = {filter: {}}

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
    this.productService.getAllProducts(this.filter).subscribe({
      next: (res) => {
        this.productData = res;
        this.products = this.productData.data;
        console.log(this.products);
      },
      error: (err) => {
        this.errorResponse = err.error.message;
      },
    });
  }

  onCategoryCheckboxChange(categoryName: string) {
    if (this.filter.categoryName === categoryName) {
      delete this.filter.categoryName;
    } else {
      this.filter.categoryName = categoryName;
    }
    this.getAllProducts();
  }

  clearCategoryFilter() {
    delete this.filter.categoryName;

    this.getAllProducts();
  }

  onSubCategoryCheckboxChange(subCategoryName: string) {
    if (this.filter.subCategoryName === subCategoryName) {
      delete this.filter.subCategoryName;
    } else {
      this.filter.subCategoryName = subCategoryName;
    }
    this.getAllProducts();
  }

  clearSubCategoryFilter() {
    delete this.filter.subCategoryName;

    this.getAllProducts();
  }

  onBrandCheckboxChange(brandName: string) {
    // if (this.filter.filter.brandName === brandName) {
    //   delete this.filter.filter.brandName;
    // } else {
    //   this.filter.filter.brandName = brandName;
    // }
    this.getAllProducts({filter: {brandName: brandName}});
  }

  clearBrandFilter() {
    delete this.filter.brandName;

    this.getAllProducts();
  }

  // products$ = this.productService.getAllProducts().pipe(
  //   map((res) => {
  //     return res.data;
  //   })
  // );

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
