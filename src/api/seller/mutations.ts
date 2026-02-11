import { sellerApi } from '@/api/seller';
import { SELLER_KEYS } from '@/api/seller/keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteMyProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => sellerApi.deleteMyProduct(productId),
    onSuccess: () => {
      toast.success('상품이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: SELLER_KEYS.all });
    },
    onError: (error) => {
      console.error('Failed to delete product:', error);
      toast.error('상품 삭제에 실패했습니다.');
    },
  });
};

export const useUpdateOrderItemStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderItemId, status }: { orderItemId: string; status: string }) =>
      sellerApi.updateOrderItemStatus(orderItemId, status),
    onSuccess: () => {
      toast.success('주문 상태가 변경되었습니다.');
      queryClient.invalidateQueries({ queryKey: SELLER_KEYS.all });
    },
    onError: (error) => {
      console.error('Failed to update order status:', error);
      toast.error('주문 상태 변경에 실패했습니다.');
    },
  });
};

export const useUpdateMySellerInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sellerInfo: { sellerName: string; sellerIntro: string }) =>
      sellerApi.updateSellerInfo(sellerInfo),
    onSuccess: () => {
      toast.success('판매자 정보가 변경되었습니다.');
      queryClient.invalidateQueries({ queryKey: SELLER_KEYS.all });
    },
    onError: (error) => {
      console.error('Failed to update seller info:', error);
      toast.error('판매자 정보 변경에 실패했습니다.');
    },
  });
};
