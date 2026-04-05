export interface ProductCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ProductSubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface ProductBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  images: string[];
  category: ProductCategory;
  subcategory: ProductSubcategory[];
  brand: ProductBrand;
  ratingsAverage: number;
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  results: number;
  data: Product[];
}

export interface ProductResponse {
  data: Product;
}
