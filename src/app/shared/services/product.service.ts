import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl: any = environment.baseUrl + 'product/';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<{ data: Product[] }> {
    return this.http.get<{ data: Product[] }>(this.apiUrl + 'get-all-products');
  }

  getProductById(id: any) {
    return this.http.get(this.apiUrl + `get-single-product-by-id/${id}`);
  }
}
