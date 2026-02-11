import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { userApi } from './index';
import { userKeys } from './keys';
import type { UpdateProfileRequest } from './types';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => userApi.updateProfile(data),
    onSuccess: (data) => {
      queryClient.setQueryData(userKeys.profile(), data);
      toast.success('프로필이 업데이트되었습니다.');
    },
    onError: (error) => {
      console.error('Update profile error:', error);
      toast.error('프로필 업데이트에 실패했습니다.');
    },
  });
};

export const useWithdrawAccount = () => {
  return useMutation({
    mutationFn: (password: string) => userApi.withdrawAccount(password),
    onSuccess: () => {
      toast.success('회원 탈퇴가 완료되었습니다.');
      // Additional cleanup or redirect logic here if needed
    },
    onError: (error) => {
      console.error('Withdraw account error:', error);
      toast.error('회원 탈퇴에 실패했습니다.');
    },
  });
};
