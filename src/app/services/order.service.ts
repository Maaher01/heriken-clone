import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../models/cart';

const BASE_API_URL = `${environment.baseUrl}order/`

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _httpClient = inject(HttpClient)

  addOrder(orderInfo: any, userId: string, orderCart: Cart) {
    const payload = {orderInfo, userId, orderCart}

    return this._httpClient.post(BASE_API_URL + 'add-order', payload)
  }
}
