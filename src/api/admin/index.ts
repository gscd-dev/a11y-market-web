import axiosInstance from '@/api/axios-instance';
import type { User } from '@/api/user/types';
import type { Seller, SellerApprovalRequest } from './types';

export const adminApi = {
  getUsers: async (): Promise<User[]> => {
    try {
      const { status, data } = await axiosInstance.get<User[]>('/v1/admin/users');

      if (status !== 200) {
        throw new Error('Failed to fetch users');
      }

      return data;
    } catch (err) {
      console.error('Error fetching users:', err);
      throw err;
    }
  },

  // 승인 대기 상품 목록 조회
  getPendingProducts: async (): Promise<any[]> => {
    try {
      const { status, data } = await axiosInstance.get('/v1/admin/products/pending');

      if (status !== 200) {
        throw new Error('Failed to fetch pending products');
      }

      return data;
    } catch (err) {
      console.error('Error fetching pending products:', err);
      throw err;
    }
  },

  // 상품 승인/반려 처리
  updateProductStatus: async (productId: string, status: string): Promise<void> => {
    try {
      const { status: respStatus } = await axiosInstance.patch(
        `/v1/admin/products/${productId}/status`,
        { status },
      );

      if (respStatus !== 200) {
        throw new Error('Failed to update product status');
      }
    } catch (err) {
      console.error('Error updating product status:', err);
      throw err;
    }
  },

  // 판매자 승인 대기 목록 조회
  getPendingSellers: async (): Promise<SellerApprovalRequest[]> => {
    try {
      const { status, data } = await axiosInstance.get<SellerApprovalRequest[]>(
        '/v1/admin/sellers/pending',
      );

      if (status !== 200) {
        throw new Error('Failed to fetch pending sellers');
      }

      return data;
    } catch (err) {
      console.error('Error fetching pending sellers:', err);
      throw err;
    }
  },

  // 판매자 승인/반려 처리
  approveSeller: async (sellerId: string): Promise<void> => {
    try {
      const { status } = await axiosInstance.post(`/v1/admin/sellers/${sellerId}/approve`);

      if (status !== 200) {
        throw new Error('Failed to approve seller');
      }
    } catch (err) {
      console.error('Error approving seller:', err);
      throw err;
    }
  },

  rejectSeller: async (sellerId: string): Promise<void> => {
    try {
      const { status } = await axiosInstance.post(`/v1/admin/sellers/${sellerId}/reject`);

      if (status !== 200) {
        throw new Error('Failed to reject seller');
      }
    } catch (err) {
      console.error('Error rejecting seller:', err);
      throw err;
    }
  },

  getAllSellers: async (): Promise<Seller[]> => {
    try {
      const { data } = await axiosInstance.get<Seller[]>('/v1/admin/sellers');
      return data;
    } catch (err) {
      console.error('Failed to fetch all sellers', err);
      throw err;
    }
  },

  getDashboardStats: async (): Promise<{
    pendingSellerCount: number;
    pendingProductCount: number;
  }> => {
    try {
      const { data } = await axiosInstance.get('/v1/admin/dashboard');
      return data;
    } catch (err) {
      console.error('Failed to get dashboard stats:', err);
      throw err;
    }
  },

  updateUserRole: async (data: { userId: string; role: string }) => {
    try {
      const { data: responseData } = await axiosInstance.patch(
        `/v1/admin/users/${data.userId}/role`,
        { role: data.role },
      );
      return { data: responseData }; // return object to match existing usage { data: ... }
    } catch (err) {
      console.error('Failed to update user role:', err);
      throw err;
    }
  },

  getAdminOrders: async (params: any) => {
    try {
      const { data } = await axiosInstance.get('/v1/admin/orders', { params });
      return data;
    } catch (err) {
      console.error('Failed to fetch admin orders:', err);
      throw err;
    }
  },

  updateOrderItemStatus: async (orderItemId: string, status: string) => {
    try {
      await axiosInstance.patch(`/v1/admin/orders/items/${orderItemId}/status`, { status });
    } catch (err) {
      console.error('Failed to update order item status:', err);
      throw err;
    }
  },
};
