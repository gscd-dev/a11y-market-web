import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { addressApi } from './index';
import { addressKeys } from './keys';
import type { AddressRequest } from './types';

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddressRequest) => addressApi.createAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.list() });
      toast.success('배송지가 등록되었습니다.');
    },
    onError: (error) => {
      console.error('Create address error:', error);
      toast.error('배송지 등록에 실패했습니다.');
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ addressId, data }: { addressId: string; data: AddressRequest }) =>
      addressApi.updateAddress(addressId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.list() });
      toast.success('배송지가 수정되었습니다.');
    },
    onError: (error) => {
      console.error('Update address error:', error);
      toast.error('배송지 수정에 실패했습니다.');
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (addressId: string) => addressApi.deleteAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.list() });
      toast.success('배송지가 삭제되었습니다.');
    },
    onError: (error) => {
      console.error('Delete address error:', error);
      toast.error('배송지 삭제에 실패했습니다.');
    },
  });
};

export const useUpdateDefaultAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (addressId: string) => addressApi.updateDefaultAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.list() });
      queryClient.invalidateQueries({ queryKey: addressKeys.default() });
      toast.success('기본 배송지가 변경되었습니다.');
    },
    onError: (error) => {
      console.error('Update default address error:', error);
      toast.error('기본 배송지 변경에 실패했습니다.');
    },
  });
};
