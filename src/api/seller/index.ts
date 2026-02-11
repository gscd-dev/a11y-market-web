import axiosInstance from '@/api/axios-instance';
import type { Product } from '@/api/product/types';
import type { DailyRevenue, DashboardStats, OrderSummary, ReceivedOrdersResponse } from './types';

export const sellerApi = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    try {
      const { status, data } = await axiosInstance.get<DashboardStats>(
        '/v1/seller/dashboard/stats',
      );

      if (status !== 200) {
        throw new Error('Failed to fetch dashboard stats');
      }

      return data;
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      throw err;
    }
  },

  updateSellerInfo: async (data: { sellerName: string; sellerIntro: string }): Promise<void> => {
    try {
      const { status } = await axiosInstance.patch('/v1/seller/info', data);

      if (status !== 200) {
        throw new Error('Failed to update seller info');
      }
    } catch (err) {
      console.error('Error updating seller info:', err);
      throw err;
    }
  },

  getDailyRevenue: async (year: number, month: number): Promise<DailyRevenue[]> => {
    try {
      const { status, data } = await axiosInstance.get<DailyRevenue[]>(
        '/v1/seller/dashboard/revenue/daily',
        {
          params: { year, month },
        },
      );

      if (status !== 200) {
        throw new Error('Failed to fetch daily revenue');
      }

      return data;
    } catch (err) {
      console.error('Error fetching daily revenue:', err);
      throw err;
    }
  },

  getTopSellingProducts: async (): Promise<Product[]> => {
    try {
      const { status, data } = await axiosInstance.get<Product[]>(
        '/v1/seller/dashboard/products/top',
      );

      if (status !== 200) {
        throw new Error('Failed to fetch top selling products');
      }

      return data;
    } catch (err) {
      console.error('Error fetching top selling products:', err);
      throw err;
    }
  },

  getRecentOrders: async (): Promise<any[]> => {
    try {
      const { status, data } = await axiosInstance.get('/v1/seller/dashboard/orders/recent');

      if (status !== 200) {
        throw new Error('Failed to fetch recent orders');
      }

      return data;
    } catch (err) {
      console.error('Error fetching recent orders:', err);
      throw err;
    }
  },

  getMyProducts: async (page = 0, size = 10): Promise<Product[]> => {
    try {
      const { status, data } = await axiosInstance.get<Product[]>('/v1/seller/products', {
        params: { page, size },
      });

      if (status !== 200) {
        throw new Error('Failed to fetch my products');
      }

      return data;
    } catch (err) {
      console.error('Error fetching my products:', err);
      throw err;
    }
  },

  deleteMyProduct: async (productId: string): Promise<void> => {
    try {
      const { status } = await axiosInstance.delete(`/v1/seller/products/${productId}`);

      if (status !== 204) {
        throw new Error('Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  },

  updateProductStock: async (productId: string, stock: number): Promise<void> => {
    try {
      const { status } = await axiosInstance.patch(`/v1/seller/products/${productId}/stock`, {
        stock,
      });

      if (status !== 200) {
        throw new Error('Failed to update product stock');
      }
    } catch (err) {
      console.error('Error updating product stock:', err);
      throw err;
    }
  },

  getReceivedOrders: async (
    page = 0,
    size = 10,
    status: string | null = null,
  ): Promise<ReceivedOrdersResponse> => {
    try {
      const { status: respStatus, data } = await axiosInstance.get<ReceivedOrdersResponse>(
        '/v1/seller/orders',
        {
          params: { page, size, status },
        },
      );

      if (respStatus !== 200) {
        throw new Error('Failed to fetch received orders');
      }

      return data;
    } catch (err) {
      console.error('Error fetching received orders:', err);
      throw err;
    }
  },

  getOrderSummary: async (): Promise<OrderSummary> => {
    try {
      const { status, data } = await axiosInstance.get<OrderSummary>('/v1/seller/orders/summary');

      if (status !== 200) {
        throw new Error('Failed to fetch order summary');
      }

      return data;
    } catch (err) {
      console.error('Error fetching order summary:', err);
      throw err;
    }
  },

  updateOrderItemStatus: async (orderItemId: string, status: string): Promise<void> => {
    try {
      const { status: respStatus } = await axiosInstance.patch(
        `/v1/seller/orders/${orderItemId}/status`,
        { status },
      );

      if (respStatus !== 200) {
        throw new Error('Failed to update order item status');
      }
    } catch (err) {
      console.error('Error updating order item status:', err);
      throw err;
    }
  },

  registerProduct: async (
    productData: any, // Typed as any for now, should be ProductRegisterRequest
    images: { file?: File }[],
  ): Promise<{ status: number }> => {
    try {
      const formData = new FormData();
      formData.append(
        'product',
        new Blob([JSON.stringify(productData)], { type: 'application/json' }),
      );

      images.forEach((img) => {
        if (img.file) {
          formData.append('images', img.file);
        }
      });

      const { status } = await axiosInstance.post('/v1/seller/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return { status };
    } catch (err) {
      console.error('Error registering product:', err);
      throw err;
    }
  },

  updateProduct: async (
    productId: string,
    productData: any, // Should be ProductUpdateRequest
    images: { file?: File }[],
  ): Promise<{ status: number }> => {
    try {
      const formData = new FormData();
      formData.append(
        'product',
        new Blob([JSON.stringify(productData)], { type: 'application/json' }),
      );

      images.forEach((img) => {
        if (img.file) {
          formData.append('images', img.file);
        }
      });

      const { status } = await axiosInstance.put(`/v1/seller/products/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return { status };
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  },
};
