import { ProductResponse, SingleProductResponse } from "~/api/types/products";
import api from "./api-handler";

export const getProducts = async (params: URLSearchParams) => {
  const products = await api.get<ProductResponse>("products", params);
  return products;
};

export const getProductDetails = async (id: string) => {
  const productDetail = await api.get<SingleProductResponse>(`products/${id}`);
  return productDetail;
};

export const createProduct = async (data: object) => {
  const response = await api.post<SingleProductResponse>("products", { data });
  return response;
};
