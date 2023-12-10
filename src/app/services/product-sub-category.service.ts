import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_API_URL = `${environment.baseUrl}product-sub-category/`;

@Injectable({
  providedIn: 'root',
})
export class ProductSubCategoryService {
  apiUrl: any = environment.baseUrl + 'product-sub-category/';

  constructor(private http: HttpClient) {}

  getAllSubCategories(): Observable<{ data: any }> {
    return this.http.get<{ data: any }>(this.apiUrl + 'get-all-sub-categories');
  }
}
