import axiosInstance from '@/api/axios-instance';
import type {
  CancelOrderRequest,
  CheckoutInfoResponse,
  CreateOrderRequest,
  Order,
  OrderDetailResponse,
  VerifyPaymentRequest,
} from './types';

export const orderApi = {
  // 내 주문 목록 조회
  getMyOrders: async (): Promise<Order[]> => {
    try {
      const { data } = await axiosInstance.get<Order[]>('/v1/users/me/orders');
      return data;
    } catch (err) {
      console.error('Failed to fetch my orders:', err);
      throw err;
    }
  },

  // 주문 상세 조회
  getMyOrderDetail: async (orderItemId: string | number): Promise<OrderDetailResponse> => {
    try {
      const { data } = await axiosInstance.get<OrderDetailResponse>(
        `/v1/users/me/orders/${orderItemId}`,
      );
      return data;
    } catch (err) {
      console.error(`Failed to fetch order detail for orderItemId ${orderItemId}:`, err);
      throw err;
    }
  },

  // 주문 취소 요청
  cancelOrder: async (orderId: string | number, data: CancelOrderRequest): Promise<void> => {
    try {
      await axiosInstance.post(`/v1/users/me/orders/cancel-request`, data);
    } catch (err) {
      console.error(`Failed to cancel order with orderId ${orderId}:`, err);
      throw err;
    }
  },

  // 결제 전 주문 정보 조회 (Legacy)
  getCheckoutInfo: async () => {
    return await axiosInstance.post('/v1/orders/pre-check');
  },

  // 결제 전 주문 정보 조회 V2
  getCheckoutInfoV2: async (
    cartItemIds: number[],
    directOrderItem?: { productId: number; quantity: number },
  ): Promise<CheckoutInfoResponse> => {
    try {
      const { data } = await axiosInstance.post<CheckoutInfoResponse>('/v2/orders/pre-check', {
        cartItemIds,
        directOrderItem,
      });
      return data;
    } catch (err) {
      console.error('Failed to get checkout info:', err);
      throw err;
    }
  },

  // 주문 생성
  createOrder: async (data: CreateOrderRequest): Promise<any> => {
    try {
      const { data: responseData } = await axiosInstance.post('/v1/orders', data);
      return responseData;
    } catch (err) {
      console.error('Failed to create order:', err);
      throw err;
    }
  },

  // 결제 검증
  verifyPayment: async (data: VerifyPaymentRequest): Promise<void> => {
    try {
      await axiosInstance.post(`/v1/payments/verify`, data);
    } catch (err) {
      console.error('Failed to verify payment:', err);
      throw err;
    }
  },

  confirmOrderItem: async (data: { orderItemId: number }): Promise<void> => {
    try {
      await axiosInstance.post(`/v1/users/me/orders/items/confirm`, data);
    } catch (err) {
      console.error('Failed to confirm order item:', err);
      throw err;
    }
  },
};
