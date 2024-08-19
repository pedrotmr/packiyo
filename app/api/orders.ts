import { OrderResponse, SingleOrderResponse } from "~/api/types/orders";
import api from "./api-handler";

export const getOrders = async (params: URLSearchParams) => {
  const orders = await api.get<OrderResponse>("orders", params);
  return orders;
};

export const getOrderDetails = async (id: string) => {
  const orderDetail = await api.get<SingleOrderResponse>(`orders/${id}`);
  return orderDetail;
};

export const createOrder = async (data: object) => {
  const response = await api.post<SingleOrderResponse>("orders", { data });
  return response;
};
