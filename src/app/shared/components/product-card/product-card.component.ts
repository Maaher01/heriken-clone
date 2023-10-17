import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;

  cartProducts: Product[];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    
  }

  addToCart(message: string) {
    this.cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    if (this.cartProducts == null) {
      this.cartProducts = [];
    }

    this.cartProducts.push(this.product);

    let unique = [...new Set(this.cartProducts)];
    const products = JSON.stringify(unique);
    localStorage.setItem('cartProducts', products);

    this.snackBar.open(message, '', {
      duration: 1500,
      panelClass: ['snackbar'],
    });
  }
}
