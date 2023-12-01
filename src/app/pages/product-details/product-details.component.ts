import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoreDetailsComponent } from './more-details/more-details.component';
import { CustomerReviewsComponent } from './customer-reviews/customer-reviews.component';
import { ProductService } from 'src/app/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  detailsAndRatingSection = MoreDetailsComponent;
  product: any;
  productData: any;
  public currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(
      (user) => (this.currentUser = user)
    );

    this.route.params.subscribe((param) => {
      this.getProductById(param['productId']);
    });
  }

  getProductById(id: any) {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.productData = product;
        this.product = this.productData.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart(productId: any) {
    const userId = this.currentUser._id;

    this.cartService.addToCart(userId, productId).subscribe({
      next: () => {
        this.snackBar.open('Added to cart successfully', '', {
          duration: 1500,
          panelClass: ['snackbar'],
        });
      },
      error: (err) => {
        console.log(err);
      },
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
