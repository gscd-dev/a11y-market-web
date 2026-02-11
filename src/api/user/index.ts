import axiosInstance from '@/api/axios-instance';
import type { UpdateProfileRequest, User } from './types';

export const userApi = {
  getProfile: async (): Promise<User> => {
    try {
      const { data } = await axiosInstance.get<User>('/v1/users/me');
      return data;
    } catch (err) {
      console.error('Error during getProfile:', err);
      throw err;
    }
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<User> => {
    try {
      const { data: responseData } = await axiosInstance.patch<User>('/v1/users/me', data);
      return responseData;
    } catch (err) {
      console.error('Error during updateProfile:', err);
      throw err;
    }
  },

  withdrawAccount: async (password: string): Promise<void> => {
    try {
      await axiosInstance.delete('/v1/users/me', {
        data: {
          userPassword: password,
        },
      });
    } catch (err) {
      console.error('Error during withdrawAccount:', err);
      throw err;
    }
  },
};
