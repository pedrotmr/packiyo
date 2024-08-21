import { redirect } from "@remix-run/node";
import { describe, expect, it, vi } from "vitest";
import { BASE_URL, CUSTOMER_ID } from "~/api/api-handler";
import { createProduct, getProducts } from "~/api/products";
import { ProductResponse } from "~/api/types/products";
import { loader as productsLoader } from "~/routes/products._index/route";
import { createProductAction } from "~/routes/products.create/create-product-action";

vi.mock("~/api/products", () => ({
  getProducts: vi.fn(),
  createProduct: vi.fn(),
}));

describe("productsListLoader", () => {
  it("should return a Response object", async () => {
    const request = new Request(`${BASE_URL}/products`);
    const response = await productsLoader({ request, params: {}, context: {} });
    expect(response).toBeInstanceOf(Response);
  });

  it("should handle API success", async () => {
    const mockData = {
      data: [{ id: "#1", type: "products", attributes: { name: "Product 1" } }],
    };
    vi.mocked(getProducts).mockResolvedValue(mockData as ProductResponse);
    const request = new Request(`${BASE_URL}/products`);
    const response = await productsLoader({ request, params: {}, context: {} });
    const data = await response.json();
    expect(data).toEqual(mockData);
    expect(response.status).toBe(200);
  });

  it("should handle API failure", async () => {
    vi.mocked(getProducts).mockRejectedValue(
      new Error("Failed to fetch products"),
    );
    try {
      const request = new Request(`${BASE_URL}/products`);
      await productsLoader({ request, params: {}, context: {} });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe("Failed to fetch products");
    }
  });

  it("should return an empty array when no products are found", async () => {
    vi.mocked(getProducts).mockResolvedValue({ data: [] });
    const request = new Request(`${BASE_URL}/products`);
    const response = await productsLoader({ request, params: {}, context: {} });
    const data = await response.json();
    expect(data).toEqual({ data: [] });
  });
});

describe("createProductAction", () => {
  it("should call createProduct with the correct product data", async () => {
    const formData = new FormData();
    formData.append("sku", "SKU123");
    formData.append("name", "Sample Product");

    const request = {
      formData: async () => formData,
    } as unknown as Request;

    await createProductAction({ request, params: {}, context: {} });

    expect(createProduct).toHaveBeenCalledWith({
      type: "products",
      attributes: {
        sku: "SKU123",
        name: "Sample Product",
        price: 0,
        notes: null,
        width: 0,
        height: 0,
        length: 0,
        weight: 0,
        barcode: null,
        value: 0,
        customs_price: 0,
        customs_description: null,
        hs_code: null,
        country_of_origin: null,
        tags: null,
        product_image_data: [],
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

  it("should return a redirect response after creating a product", async () => {
    const formData = new FormData();
    formData.append("sku", "SKU123");

    const request = {
      formData: async () => formData,
    } as unknown as Request;

    const response = await createProductAction({
      request,
      params: {},
      context: {},
    });
    expect(response).toEqual(redirect("/products"));
  });

  it("should handle errors from createProduct gracefully", async () => {
    vi.mocked(createProduct).mockRejectedValueOnce(
      new Error("Failed to create product"),
    );

    const formData = new FormData();
    formData.append("sku", "SKU123");

    const request = {
      formData: async () => formData,
    } as unknown as Request;

    try {
      await createProductAction({ request, params: {}, context: {} });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe("Failed to create product");
    }
  });
});
