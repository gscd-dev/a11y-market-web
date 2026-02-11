import type { OrderItem } from '@/api/order/types';

export const ESellerSubmitStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;

export type SellerSubmitStatus = keyof typeof ESellerSubmitStatus;

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalReviews: number;
  sellerName: string;
  sellerId: string;
  sellerIntro: string;
  refundRate: number;
  confirmedRate: number;
}

export interface DailyRevenue {
  date: string;
  revenue: number;
}

export interface ReceivedOrder extends OrderItem {
  orderId: string; // Added to fix lint
  buyerName: string;
  buyerPhone: string;
  receiverName: string;
  receiverPhone: string;
  shippingAddress: string;
  orderedAt: string;
}

export interface ReceivedOrdersResponse {
  orderItems: ReceivedOrder[];
  totalOrderCount: number;
}

export interface OrderSummary {
  newOrders: number;
  acceptedOrders: number;
  shippingOrders: number;
  completedOrders: number;
  claimedOrders: number;
}
