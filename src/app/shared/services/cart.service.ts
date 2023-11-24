import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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

  getUserCart(userId: string) {
    const params = {userId}
    
    return this.http.get(this.apiUrl + 'get-user-cart', {params});
  }
}
