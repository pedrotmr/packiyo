import { redirect } from "@remix-run/node";
import { describe, expect, it, vi } from "vitest";
import { CUSTOMER_ID } from "~/api/api-handler";
import { createOrder, getOrderDetails, getOrders } from "~/api/orders";
import { OrderResponse, SingleOrderResponse } from "~/api/types/orders";
import { loader as orderDetailLoader } from "~/routes/orders.$id/route";
import { loader as orderListLoader } from "~/routes/orders._index/route";
import { createOrderAction } from "~/routes/orders.create/create-order-action";

vi.mock("~/api/orders", () => ({
  getOrders: vi.fn(),
  createOrder: vi.fn(),
  getOrderDetails: vi.fn(),
}));

describe("orderListLoader", () => {
  it("should return a Response object", async () => {
    const response = await orderListLoader();
    expect(response).toBeInstanceOf(Response);
  });

  it("should handle API success", async () => {
    const mockData = {
      data: [{ id: "#12312", type: "orders", attributes: { number: "12" } }],
    };
    vi.mocked(getOrders).mockResolvedValue(mockData as OrderResponse);
    const response = await orderListLoader();
    const data = await response.json();
    expect(data).toEqual(mockData);
    expect(response.status).toBe(200);
  });

  it("should handle API failure", async () => {
    vi.mocked(getOrders).mockRejectedValue(new Error("Failed to fetch orders"));
    try {
      await orderListLoader();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe("Failed to fetch orders");
    }
  });

  it("should return an empty array when no orders are found", async () => {
    vi.mocked(getOrders).mockResolvedValue({ data: [] });
    const response = await orderListLoader();
    const data = await response.json();
    expect(data).toEqual({ data: [] });
  });

  it("should simulate a loading state", async () => {
    const mockData = {
      data: [{ id: "#12312", type: "orders", attributes: { number: "12" } }],
    };
    let resolvePromise: (value?: unknown) => void;
    const promise = new Promise((resolve) => (resolvePromise = resolve));
    vi.mocked(getOrders).mockReturnValue(promise as Promise<OrderResponse>);
    setTimeout(() => resolvePromise(mockData), 100);
    const response = await orderListLoader();
    const data = await response.json();
    expect(data).toEqual(mockData);
  });
});

describe("orderDetailLoader", () => {
  it("should handle API success", async () => {
    const mockData = {
      data: { id: "#12345", type: "orders", attributes: { number: "12" } },
    };
    vi.mocked(getOrderDetails).mockResolvedValueOnce(
      mockData as SingleOrderResponse,
    );
    const params = { id: "#12345" };
    const response = await orderDetailLoader({ params });
    const data = await response.json();
    expect(getOrderDetails).toHaveBeenCalledWith("#12345");
    expect(data).toEqual(mockData);
    expect(response.status).toBe(200);
  });

  it("should handle API failure", async () => {
    vi.mocked(getOrderDetails).mockRejectedValueOnce(
      new Error("Failed to fetch order details"),
    );
    const params = { id: "#12345" };
    try {
      await orderDetailLoader({ params });
    } catch (error) {
      expect(getOrderDetails).toHaveBeenCalledWith("#12345");
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe("Failed to fetch order details");
    }
  });

  it("should handle invalid ID format", async () => {
    vi.mocked(getOrderDetails).mockImplementationOnce(() => {
      throw new Error("Invalid ID format");
    });
    const params = { id: "invalid-id" };
    try {
      await orderDetailLoader({ params });
    } catch (error) {
      expect(getOrderDetails).toHaveBeenCalledWith("invalid-id");
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe("Invalid ID format");
    }
  });
});

describe("createOrderAction", () => {
  it("should call createOrder with the correct order data", async () => {
    const formData = new FormData();
    formData.append("number", "12345");
    formData.append("shipping_name", "John Doe");
    formData.append("shipping_address", "123 Main St");
    formData.append("selected_products", "SKU123");

    const request = {
      formData: async () => formData,
    } as unknown as Request;

    await createOrderAction({ request, params: {}, context: {} });

    expect(createOrder).toHaveBeenCalledWith({
      type: "orders",
      attributes: {
        number: "12345",
        order_channel_name: null,
        ordered_at: null,
        hold_until: null,
        ship_before: null,
        shipping: 0,
        tax: 0,
        discount: 0,
        packing_note: null,
        shipping_method_name: null,
        shipping_method_code: null,
        tags: null,
        shipping_contact_information_data: {
          name: "John Doe",
          company_name: null,
          address: "123 Main St",
          address2: null,
          city: null,
          state: null,
          zip: null,
          country: null,
          email: null,
          phone: null,
        },
        billing_contact_information_data: {
          name: null,
          company_name: null,
          address: null,
          address2: null,
          city: null,
          state: null,
          zip: null,
          country: null,
          email: null,
          phone: null,
        },
        order_item_data: [{ sku: "SKU123", quantity: 1 }],
      },
      relationships: {
        customer: {
          data: {
            type: "customers",
            id: CUSTOMER_ID,
          },
        },
      },
    });
  });

  it("should return a redirect response after creating an order", async () => {
    const formData = new FormData();
    formData.append("number", "12345");
    formData.append("shipping_name", "John Doe");
    const request = {
      formData: async () => formData,
    } as unknown as Request;
    const response = await createOrderAction({
      request,
      params: {},
      context: {},
    });
    expect(response).toEqual(redirect("/orders"));
  });

  it("should handle errors from createOrder gracefully", async () => {
    vi.mocked(createOrder).mockRejectedValueOnce(
      new Error("Failed to create order"),
    );

    const formData = new FormData();
    formData.append("number", "67890");

    const request = {
      formData: async () => formData,
    } as unknown as Request;

    try {
      await createOrderAction({ request, params: {}, context: {} });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe("Failed to create order");
    }
  });
});
