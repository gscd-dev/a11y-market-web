import axiosInstance from '@/api/axios-instance';
import { toast } from 'sonner';
import type { CategoryRecommendResponse, EventBanner, MonthlyPopularProduct } from './types';

export const mainApi = {
  getEventBanners: async (): Promise<EventBanner[]> => {
    try {
      const { status, data } = await axiosInstance.get('/v1/main/events');

      if (status !== 200) {
        throw new Error('이벤트 배너 조회에 실패했습니다.');
      }

      return data;
    } catch (err) {
      console.error('Error during getEventBanners:', err);
      toast.error('이벤트 배너를 불러오는 중 오류가 발생했습니다.');
      throw err;
    }
  },

  getPopularItems: async (): Promise<MonthlyPopularProduct[]> => {
    try {
      const { status, data } = await axiosInstance.get('/v1/main/products/populars');

      if (status !== 200) {
        throw new Error('인기 상품 조회에 실패했습니다.');
      }

      return data;
    } catch (err) {
      console.error('Error during getPopularItems:', err);
      toast.error('인기 상품을 불러오는 중 오류가 발생했습니다.');
      throw err;
    }
  },

  getCategories: async (): Promise<CategoryRecommendResponse[]> => {
    try {
      const { status, data } = await axiosInstance.get<CategoryRecommendResponse[]>(
        '/v1/main/products/categories',
      );

      if (status !== 200) {
        throw new Error('카테고리 조회에 실패했습니다.');
      }

      return data;
    } catch (err) {
      console.error('Error during getCategories:', err);
      toast.error('카테고리를 불러오는 중 오류가 발생했습니다.');
      throw err;
    }
  },

  getProductsByCategory: async (categoryId: string): Promise<CategoryRecommendResponse> => {
    try {
      const { status, data } = await axiosInstance.get(`/v1/categories/${categoryId}/products`);

      if (status !== 200) {
        throw new Error('카테고리별 상품 조회에 실패했습니다.');
      }

      return data;
    } catch (err) {
      console.error('Error during getProductsByCategory:', err);
      toast.error('카테고리별 상품을 불러오는 중 오류가 발생했습니다.');
      throw err;
    }
  },
};
