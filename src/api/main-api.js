import axiosInstance from './axios-instance';

export const mainApi = {
  getPopularItems: () => axiosInstance.get('/v1/main/products/populars'),

  getCategories: () => axiosInstance.get('/v1/categories'),

  getProductsByCategory: (categoryId) => axiosInstance.get(`/v1/categories/${categoryId}/products`),
};
