export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends AuthResponse {
  user: any;
}

export interface JoinRequest {
  userEmail: string;
  userPass: string;
  userName: string;
  userNickname: string;
  userPhone: string;
  phoneNumber?: string; // Add this if referenced elsewhere, or stick to interface from file
}

export interface KakaoJoinRequest {
  userEmail: string;
  userName: string;
  userNickname: string;
  userPhone: string;
}

export interface CheckExistsResponse {
  isAvailable: boolean;
}
