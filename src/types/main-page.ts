import type { SimpleProductInfo } from './product';

export interface EventBanner {
  eventTitle: string;
  eventDescription: string;
  eventImageUrl: string;
  eventUrl: string;
}

export interface MonthlyPopularProduct extends SimpleProductInfo {
  categoryId: string;
  categoryName: string;
  sellerId: string;
  monthlySalesVolume: number;
  monthlyOrderCount: number;
  ranking: number;
}

export interface CategoryRecommendResponse {
  categoryId: string;
  categoryName: string;
  products: SimpleProductInfo[];
}
