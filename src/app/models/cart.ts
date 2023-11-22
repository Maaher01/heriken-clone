import { Product } from './product';

export interface Cart {
  _id: string;
  userId: string;
  cartProducts: CartProducts[];
  createdAt: string;
  updatedAt: string;
}

export interface CartProducts {
  product: Product;
  productQuantity: Number;
}
