import axiosInstance from '@/api/axios-instance';

export const cartApi = {
  getCartItems: async () => await axiosInstance.get('/v1/cart/me'),

  getCartItemNumber: async () => await axiosInstance.get('/v1/cart/me/items/count'),

  addCartItem: async (productId, quantity) => {
    const resp = await axiosInstance.post(`/v1/cart/items`, {
      productId: productId,
      quantity: quantity,
    });
    return resp.data;
  },

  updateCartItemQuantity: async (itemId, quantity) => {
    await axiosInstance.patch(`/v1/cart/items/${itemId}`, {
      quantity: quantity,
    });
  },

  deleteCartItems: async (itemIds) => {
    await axiosInstance.delete(`/v1/cart/items`, {
      itemIds: {
        itemIds: itemIds,
      },
    });
  },
};
