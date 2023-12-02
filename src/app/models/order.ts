export interface Order {
    userId: string;
    orderInfo: OrderInfo[];
    orderCart: string
  }

  export interface OrderInfo {
    name: string;
    phoneNo: string;
    shippingAddress: string;
    paymentMethod: string;
    deliveryCharge: Number
  }