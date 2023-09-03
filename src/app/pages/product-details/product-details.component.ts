import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoreDetailsComponent } from './more-details/more-details.component';
import { CustomerReviewsComponent } from './customer-reviews/customer-reviews.component';
import { ProductService } from 'src/app/shared/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  detailsAndRatingSection = MoreDetailsComponent;
  product: any;
  products: any;
  productData: any;
  cartProducts: Array<any> = [];
  cartData: any;
  currentProducts: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.getProductById(param['productId']);
    });
  }

  getProductById(id: any) {
    this.productService.getProductById(id).subscribe((product) => {
      this.productData = product;
      this.product = this.productData.data;
    });
  }

  addToCart(productId, message: string) {
    this.currentProducts = JSON.parse(localStorage.getItem('cartProducts'));
    if (this.currentProducts == null) {
      this.currentProducts = [];
    }
    this.cartData = this.products.find((m) => m?._id == productId);
    this.currentProducts.push(this.cartData);
    let unique = [...new Set(this.currentProducts)];
    const products = JSON.stringify(unique);
    localStorage.setItem('cartProducts', products);
    this.snackBar.open(message, '', {
      duration: 1500,
      panelClass: ['snackbar'],
    });
  }

  assignDetailsOrReviews(component) {
    if (component === 'more-details') {
      this.detailsAndRatingSection = MoreDetailsComponent;
    } else {
      this.detailsAndRatingSection = CustomerReviewsComponent;
    }
  }
}
