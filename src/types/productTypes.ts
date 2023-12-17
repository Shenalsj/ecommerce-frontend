interface Category {
  _id: string;
  id: string;
  name: string;
  image: string;
  catId: string;
  creationAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  imageURL: string;
  imageAlt: string;
  imageCredit: string;
  categoryId: string;
  category: Category;
  rating:number
  numReviews: number;

}

export interface CreateProductRequest {
  name: string;
  price: number;
  description: string;
  categoryId: string;
  image: string;
}

export interface UpdateProductRequest {
  _id: string;
  name: string;
  price: number;
}

export interface ProductResponse {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: Category;
  creationAt: string;
  updatedAt: string;
}
