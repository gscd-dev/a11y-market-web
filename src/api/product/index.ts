import axiosInstance from '@/api/axios-instance';
import type { Product, ProductResponse, ProductSearchParams } from './types';

export const productApi = {
  getProducts: async (params?: ProductSearchParams): Promise<ProductResponse> => {
    try {
      const { data } = await axiosInstance.get<ProductResponse>('/v1/products', { params });
      return data;
    } catch (err) {
      console.error('Error during getProducts:', err);
      throw err;
    }
  },

  getProductDetails: async (productId: string): Promise<Product> => {
    try {
      const { data } = await axiosInstance.get<Product>(`/v1/products/${productId}`);
      return data;
    } catch (err) {
      console.error('Error during getProductDetails:', err);
      throw err;
    }
  },
};
