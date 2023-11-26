import { Product } from './product';

export interface Cart {
  _id: string;
  userId: string;
  cartProducts: CartProducts[];
  createdAt: string;
  updatedAt: string;
  __v: Number
}

export interface CartProducts {
  product: Product;
  productQuantity: Number;
}
