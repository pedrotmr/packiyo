import { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { CUSTOMER_ID } from "~/api/api-handler";
import { createOrder } from "~/api/orders";

export const createOrderAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const orderData = {
    type: "orders",
    attributes: {
      number: formData.get("number"),
      order_channel_name: formData.get("order_channel_name"),
      ordered_at: formData.get("ordered_at"),
      hold_until: formData.get("hold_until"),
      ship_before: formData.get("ship_before"),
      shipping: Number(formData.get("shipping")),
      tax: Number(formData.get("tax")),
      discount: Number(formData.get("discount")),
      packing_note: formData.get("packing_note"),
      shipping_method_name: formData.get("shipping_method_name"),
      shipping_method_code: formData.get("shipping_method_code"),
      tags: formData.get("tags"),
      shipping_contact_information_data: {
        name: formData.get("shipping_name"),
        company_name: formData.get("shipping_company_name"),
        address: formData.get("shipping_address"),
        address2: formData.get("shipping_address2"),
        city: formData.get("shipping_city"),
        state: formData.get("shipping_state"),
        zip: formData.get("shipping_zip"),
        country: formData.get("shipping_country"),
        email: formData.get("shipping_email"),
        phone: formData.get("shipping_phone"),
      },
      billing_contact_information_data: {
        name: formData.get("billing_name"),
        company_name: formData.get("billing_company_name"),
        address: formData.get("billing_address"),
        address2: formData.get("billing_address2"),
        city: formData.get("billing_city"),
        state: formData.get("billing_state"),
        zip: formData.get("billing_zip"),
        country: formData.get("billing_country"),
        email: formData.get("billing_email"),
        phone: formData.get("billing_phone"),
      },
      order_item_data: formData.getAll("selected_products").map((sku) => ({
        sku: sku,
        quantity: 1,
      })),
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

  await createOrder(orderData);
  return redirect("/orders");
};
