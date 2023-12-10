import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_API_URL = `${environment.baseUrl}product-brand/`;

@Injectable({
  providedIn: 'root',
})
export class ProductBrandService {
  private _httpClient = inject(HttpClient);

  getAllBrands(): Observable<{ data: any }> {
    return this._httpClient.get<{ data: any }>(BASE_API_URL + 'get-all-brands');
  }
}
