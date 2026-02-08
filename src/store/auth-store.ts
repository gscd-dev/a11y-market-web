import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;

  actions: {
    // 로그인 성공 시 토큰 저장
    loginSucess: (accessToken: string, refreshToken: string) => void;
    // 로그아웃 시 토큰 제거
    logout: () => void;
    // 토큰 갱신
    tokenRefresh: (accessToken: string) => void;
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isAuthenticated: false,

  actions: {
    loginSucess: (accessToken: string, refreshToken: string) =>{
      localStorage.setItem('refreshToken', refreshToken);
      set(() => ({
        accessToken,
        isAuthenticated: true,
      }));
    },
    logout: () => {
      localStorage.removeItem('refreshToken');
      set(() => ({
        accessToken: null,
        isAuthenticated: false,
      }));
    },
    tokenRefresh: (accessToken: string) =>
      set(() => ({
        accessToken,
        isAuthenticated: true,
      })),
  },
}))

export const useAuthActions = () => useAuthStore((state) => state.actions);