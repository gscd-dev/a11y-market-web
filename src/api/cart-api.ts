import axiosInstance from '@/api/axios-instance';
import type {
  AddCartItemRequest,
  CartItemResponse,
  CartItemUpdateResponse,
  UpdateCartItemRequest,
} from '@/types/cart';

export const cartApi = {
  getCartItems: async (): Promise<CartItemResponse> => {
    try {
      const { data } = await axiosInstance.get('/v1/cart/me');
      return data;
    } catch (err) {
      console.error('Failed to get cart items:', err);
      return Promise.reject(err);
    }
  },

  getCartItemCount: async (): Promise<number> => {
    try {
      const { data } = await axiosInstance.get<{ count: number }>('/v1/cart/me/items/count');
      return data.count;
    } catch (err) {
      console.error('Failed to get cart item number:', err);
      return Promise.reject(err);
    }
  },

  addCartItem: async ({
    productId,
    quantity,
  }: AddCartItemRequest): Promise<CartItemUpdateResponse> => {
    try {
      const { data, status } = await axiosInstance.post<CartItemUpdateResponse>(
        `/v1/cart/me/items`,
        {
          productId: productId,
          quantity: quantity,
        },
      );
      if (status === 201) {
        return data;
      } else {
        throw new Error('Failed to add cart item');
      }
    } catch (err) {
      console.error('Failed to add cart item:', err);
      return Promise.reject(err);
    }
  },

  updateCartItemQuantity: async ({
    itemId,
    quantity,
  }: UpdateCartItemRequest): Promise<CartItemUpdateResponse> => {
    try {
      const { status, data } = await axiosInstance.patch<CartItemUpdateResponse>(
        `/v1/cart/me/items/${itemId}`,
        {
          quantity: quantity,
        },
      );
      if (status === 200) {
        return data;
      } else {
        throw new Error('Failed to update cart item quantity');
      }
    } catch (err) {
      console.error('Failed to update cart item quantity:', err);
      return Promise.reject(err);
    }
  },

  deleteCartItems: async (itemIds: string[]): Promise<void> => {
    try {
      const { status } = await axiosInstance.delete<void>(`/v1/cart/me/items`, {
        data: {
          itemIds: itemIds,
        },
      });

      if (status !== 204) {
        throw new Error('Failed to delete cart items');
      }
    } catch (err) {
      console.error('Failed to delete cart items:', err);
      return Promise.reject(err);
    }
  },
};
