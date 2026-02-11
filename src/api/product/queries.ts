import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { productApi } from './index';
import { productKeys } from './keys';
import type { ProductSearchParams } from './types';

export const useGetProducts = (params?: ProductSearchParams) => {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => productApi.getProducts(params),
    placeholderData: keepPreviousData,
  });
};

export const useGetProductDetails = (productId: string) => {
  return useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => productApi.getProductDetails(productId),
    enabled: !!productId,
  });
};
