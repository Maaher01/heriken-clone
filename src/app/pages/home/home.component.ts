import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  products$ = this.productService.getAllProducts().pipe(
    map((res) => {
      return res.data;
    })
  );

  constructor(private productService: ProductService) {}
}
