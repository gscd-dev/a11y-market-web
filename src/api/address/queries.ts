import { useQuery } from '@tanstack/react-query';
import { addressApi } from './index';
import { addressKeys } from './keys';

export const useGetAddressList = () => {
  return useQuery({
    queryKey: addressKeys.list(),
    queryFn: addressApi.getAddressList,
  });
};

export const useGetDefaultAddress = () => {
  return useQuery({
    queryKey: addressKeys.default(),
    queryFn: addressApi.getDefaultAddress,
  });
};
