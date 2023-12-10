import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  constructor(private productService: ProductService) {}

  leatherProducts$ = this.productService
    .getAllProducts({filter: {categoryName: "Leather"}})
    .pipe(
      map((res) => {
        return res.data;
      })
    );

    earbuds$ = this.productService
    .getAllProducts({filter: {subCategoryName: "Earbuds"}})
    .pipe(
      map((res) => {
        return res.data;
      })
    );

    earphones$ = this.productService
    .getAllProducts({filter: {subCategoryName: "Earphones"}})
    .pipe(
      map((res) => {
        return res.data;
      })
    );
}
