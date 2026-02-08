import { useAuthActions, useAuthStore } from '@/store/auth-store';
import { useNavigate } from '@tanstack/react-router';
import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    // const token = null; // 임시로 토큰을 가져오는 부분을 비워둠

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

axiosInstance.interceptors.response.use(
  (resp) => {
    return resp;
  },
  async (err: AxiosError) => {
    const originalRequest = err.config as CustomAxiosRequestConfig;

    // Zustand Actions 가져오기
    const { logout, tokenRefresh } = useAuthActions();

    if (err.response?.status === 403 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(
          `${API_BASE_URL}/api/auth/refresh`,
          {refreshToken}
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Zustand 상태 업데이트
        tokenRefresh(accessToken);
        
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }

        // 실패했던 요청에 새로운 액세스 토큰 설정 후 재시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        // 리프레시 토큰도 유효하지 않은 경우
        toast.error('세션이 만료되었습니다. 다시 로그인해주세요.');
        // 토큰 제거 및 상태 초기화
        logout();

        // 리다이렉트 처리
        (useNavigate())({ to: '/login' });

        // 원래의 에러 반환
        return Promise.reject(err);
      }
    }

    return Promise.reject(err.response?.data || err);
  },
);

export default axiosInstance;
