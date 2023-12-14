import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cart } from 'src/app/models/cart';
import { Observable } from 'rxjs';

const BASE_API_URL = `${environment.baseUrl}cart/`

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private _httpClient = inject(HttpClient)

  addToCart(userId: string, productId: string) {
    const data = { userId, productId };

    return this._httpClient.post(BASE_API_URL + 'add-to-cart', data);
  }

  removeFromCart(userId: string, productId: string) {
    const data = { userId, productId };

    return this._httpClient.post(BASE_API_URL + 'remove-from-cart', data);
  }

  getUserCart(userId: string): Observable<any> {
    const params = {userId}
    
    return this._httpClient.get<Cart>(BASE_API_URL + 'get-user-cart', {params});
  }
}
