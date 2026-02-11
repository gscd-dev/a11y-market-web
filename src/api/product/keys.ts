import type { ProductSearchParams } from './types';

export const productKeys = {
  all: ['products'] as const,
  list: (params?: ProductSearchParams) => [...productKeys.all, 'list', params] as const,
  detail: (productId: string) => [...productKeys.all, 'detail', productId] as const,
};
