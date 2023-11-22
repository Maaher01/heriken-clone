import { Cart } from './cart';

export interface User {
  _id: string;
  carts: Cart[];
  fullName: string;
  email: string;
  address: string;
  phoneNo: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  __v: Number;
}
