import { useQuery } from '@tanstack/react-query';
import { orderApi } from './index';
import { orderKeys } from './keys';

export const useGetMyOrders = () => {
  return useQuery({
    queryKey: orderKeys.list(),
    queryFn: orderApi.getMyOrders,
  });
};

export const useGetMyOrderDetail = (orderItemId: string | number) => {
  return useQuery({
    queryKey: orderKeys.detail(orderItemId),
    queryFn: () => orderApi.getMyOrderDetail(orderItemId),
    enabled: !!orderItemId,
  });
};
