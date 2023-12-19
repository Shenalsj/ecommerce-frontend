//api.ts
import axios from "axios";
import {
  CreateProductRequest,
  ProductResponse,
  Product,
  UpdateProductRequest,
} from "../types/productTypes";

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await axios.get<Product[]>(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/products`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products: ");
  }
}

export async function postNewProduct(
  productData: CreateProductRequest
): Promise<ProductResponse> {
  try {
   
    const { data } = await axios.post<ProductResponse>(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/products/`,
      productData
    );
    return data;
  } catch (error) {
    throw new Error("Failed to add new product.");
  }
}

export async function updateProduct({
  _id,
  name,
  price,
}: UpdateProductRequest): Promise<ProductResponse> {
  try {
    const { data } = await axios.put<ProductResponse>(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/products/${_id}`,
      { name, price }
    );
    return data;
  } catch (error) {
    throw new Error("Failed to update the product.");
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const { data } = await axios.delete<boolean>(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/products/${id}`
    );
    return data;
  } catch (error: any) {
    throw new Error("Failed to delete a product.");
  }
}

export type CartItems = { [productID: string]: number };
export type CheckoutResponse = { success: boolean; error?: string };

export async function checkout(items: CartItems): Promise<CheckoutResponse> {
  const modifier = Object.keys(items).length > 0 ? "success" : "error";
  const url = `/checkout-${modifier}.json`;
  await sleep(500);
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(items),
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error);
  }
  return data as CheckoutResponse;
}

const sleep = (time: number) => new Promise((res) => setTimeout(res, time));




