export interface ProductImage {
  imageId: string;
  imageUrl: string;
  altText: string;
  imageSequence: number;
}

export interface ProductImageMetadata {
  originalFileName: string;
  imageId: string;
  imageSequence: number;
  altText: string;
  isNew: boolean;
}

export interface ProductImageUpdateRequest {
  request: {
    productName: string;
    productDescription: string;
    categoryId: string;
    productPrice: number;
    productStock: number;
    productStatus: ProductStatus;
    imageMetadataList: ProductImageMetadata[];
  };
  iamges: File[];
}

export interface SimpleProductInfo {
  productId: string;
  productName: string;
  productPrice: number;
  productImageUrl: string;
  sellerId: string;
  sellerName: string;
  isA11yGuarantee: boolean;
  createdAt: string;
  salesCount: number;
}

export type ProductStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAUSED' | 'DELETED';

export interface Product extends SimpleProductInfo {
  productDescription: string;
  productImages: ProductImage[];
  parentCategoryId: string;
  categoryId: string;
  categoryName: string;
  productStatus: ProductStatus;
  productStock: number;
  summaryText?: string;
  usageContext?: string;
  usageMethod?: string;
}

export interface ProductSearchParams {
  page?: number;
  size?: number;
  sort?: string;
  category?: string;
  keyword?: string;
}

export interface ProductResponse {
  content: SimpleProductInfo[];
  totalPages: number;
  totalElements: number;
  size: number;
}
