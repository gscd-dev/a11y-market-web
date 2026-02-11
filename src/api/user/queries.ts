import { useQuery } from '@tanstack/react-query';
import { userApi } from './index';
import { userKeys } from './keys';

export const useGetProfile = () => {
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: userApi.getProfile,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
