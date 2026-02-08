interface ProductImage {
  imageId: string;
  imageUrl: string;
  altTest: string;
  imageSequence: number;
}

export interface Product {
  productId: string;
  productName: string;
  productDescription: string;
  sellerName: string;
  isA11yGuarantee: boolean;
  productPrice: number;
  productImages: ProductImage[];
  parentCategoryId: string;
  categoryId: string;
  categoryName: string;
}