import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';

const BASE_API_URL = `${environment.baseUrl}product/`;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _httpClient = inject(HttpClient);

  getAllProducts(filter?: any): Observable<{ data: Product[] }> {
    return this._httpClient.post<{ data: Product[], count: number }>(BASE_API_URL + 'get-all-products', filter);
  }

  getProductById(id: any): Observable<{ data: Product }> {
    return this._httpClient.get<{ data: Product }>(
      BASE_API_URL + `get-single-product-by-id/${id}`
    );
  }
}
