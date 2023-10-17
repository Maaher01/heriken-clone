import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productData: any;
  products: Product[]; 
  cartProducts: any[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (results) => {
        this.productData = results;
        this.products = this.productData.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
