import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl: any = environment.baseUrl + 'product/';

  constructor(private http: HttpClient) {}

  getAllProducts() {
    let params = new HttpParams();
    return this.http.post(this.apiUrl + 'get-all-products', { params });
  }

  getProductById(id: any) {
    return this.http.get(this.apiUrl + `get-single-product-by-id/${id}`);
  }
}
