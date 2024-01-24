import { Product } from './product';

// Order
export interface Order {
    shippingDetails?: any;
    products?: Product[];
    orderId?: any;
    totalAmount?: any;
}