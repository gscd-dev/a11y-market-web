export interface AdminStats {
  totalUsers: number;
  totalSellers: number;
  totalProducts: number;
  totalOrders: number;
}

export interface SellerApprovalRequest {
  sellerId: string;
  userId: string;
  companyName: string;
  sellerName: string; // Added to fix lint
  businessNumber: string;
  representativeName: string;
  contactNumber: string;
  email: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestedAt: string;
}

export interface Seller {
  sellerId: string;
  sellerName: string;
  businessNumber: string;
  storeIntro: string;
  contactEmail: string;
  contactPhone: string;
  sellerGrade: 'NEWER' | 'REGULAR' | 'TRUSTED';
  isA11yGuarantee: boolean;
  createdAt: string;
  updatedAt: string;
}

import type { Product } from '@/api/product/types';

export interface SellerDetail extends Seller {
  products: Product[];
}

export interface DashboardStats {
  pendingSellerCount: number;
  pendingProductCount: number;
}

export interface AdminOrderSearchParams {
  searchType: string;
  keyword: string;
  startDate: string;
  endDate: string;
}

export interface UpdateUserRoleRequest {
  userId: string;
  role: 'USER' | 'SELLER' | 'ADMIN';
}
