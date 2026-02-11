import { cartApi } from '@/api/cart';
import { CART_KEYS } from '@/api/cart/keys';
import { useAuthStore } from '@/store/auth-store';
import { useQuery } from '@tanstack/react-query';

export const useCartCount = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: CART_KEYS.count(),
    queryFn: () => cartApi.getCartItemCount(),
    enabled: isAuthenticated,
    initialData: 0,
  });
};

export const useCartItems = () => {
  return useQuery({
    queryKey: CART_KEYS.items(),
    queryFn: () => cartApi.getCartItems(),
  });
};
