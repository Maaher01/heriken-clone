import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cart } from 'src/app/models/cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  apiUrl: any = environment.baseUrl + 'cart/';

  constructor(private http: HttpClient) {}

  addToCart(userId: string, productId: string) {
    const data = { userId, productId };

    return this.http.post(this.apiUrl + 'add-to-cart', data);
  }

  getUserCart(userId: string): Observable<any> {
    const params = {userId}
    
    return this.http.get<Cart>(this.apiUrl + 'get-user-cart', {params});
  }
}
