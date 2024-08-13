import { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { CUSTOMER_ID } from "~/api/api-handler";
import { createProduct } from "~/api/products";

export const createProductAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const productData = {
    type: "products",
    attributes: {
      sku: formData.get("sku"),
      name: formData.get("name"),
      price: Number(formData.get("price")),
      notes: formData.get("notes"),
      width: Number(formData.get("width")),
      height: Number(formData.get("height")),
      length: Number(formData.get("length")),
      weight: Number(formData.get("weight")),
      barcode: formData.get("barcode"),
      value: Number(formData.get("value")),
      customs_price: Number(formData.get("customs_price")),
      customs_description: formData.get("customs_description"),
      hs_code: formData.get("hs_code"),
      country_of_origin: formData.get("country_of_origin"),
      tags: formData.get("tags"),
      product_image_data: formData
        .getAll("product_images")
        .map((value: FormDataEntryValue) => {
          if (typeof value === "string") {
            return { source: value };
          }
          return null;
        })
        .filter((item): item is { source: string } => item !== null),
    },
    relationships: {
      customer: {
        data: {
          type: "customers",
          id: CUSTOMER_ID,
        },
      },
    },
  };

  await createProduct(productData);
  return redirect("/products");
};
