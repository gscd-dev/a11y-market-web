import axiosInstance from '@/api/axios-instance';
import type { Address, AddressRequest } from './types';

export const addressApi = {
  // 전체 배송지 조회
  getAddressList: async (): Promise<Address[]> => {
    const { data } = await axiosInstance.get<Address[]>('/v1/users/me/address');
    return data;
  },

  // 기본 배송지 조회
  getDefaultAddress: async (): Promise<Address> => {
    const { data } = await axiosInstance.get<Address>('/v1/users/me/default-address');
    return data;
  },

  // 신규 배송지 등록
  createAddress: async (data: AddressRequest): Promise<Address> => {
    const { data: responseData } = await axiosInstance.post<Address>('/v1/users/me/address', data);
    return responseData;
  },

  // 배송지 수정
  updateAddress: async (addressId: string, data: AddressRequest): Promise<Address> => {
    const { data: responseData } = await axiosInstance.put<Address>(
      `/v1/users/me/address/${addressId}`,
      data,
    );
    return responseData;
  },

  // 배송지 삭제
  deleteAddress: async (addressId: string): Promise<void> => {
    await axiosInstance.delete(`/v1/users/me/address/${addressId}`);
  },

  // 기본 배송지 변경
  updateDefaultAddress: async (addressId: string): Promise<void> => {
    await axiosInstance.patch('/v1/users/me/default-address', {
      addressId,
    });
  },
};
