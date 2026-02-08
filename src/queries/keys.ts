export const CART_KEYS = {
  all: ['cart'] as const,
  count: () => [...CART_KEYS.all, 'count'] as const,
  items: () => [...CART_KEYS.all, 'items'] as const,
};
