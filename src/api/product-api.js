import axiosInstance from './axios-instance';

export const productApi = {
  getProducts: async (params) => await axiosInstance.get('/v1/products', { params }),

  getProductDetails: async (productId) => await axiosInstance.get(`/v1/products/${productId}`),
};
