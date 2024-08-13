import { json, useLoaderData } from "@remix-run/react";
import { getOrderDetails } from "~/api/orders";
import { SingleOrderResponse } from "~/api/types/orders";
import { Attributes } from "~/api/types/products";
import DisplayInfoText from "~/ui/DisplayInfoText";
import { isDateString } from "~/utils/is-date";

export const loader = async ({ params }: { params: { id: string } }) => {
  const product = await getOrderDetails(params.id);
  return json(product);
};

const OrderDetail = () => {
  const response = useLoaderData<SingleOrderResponse>();
  const attributes: Attributes = response.data.attributes;

  const included = response.included;

  const shippingContact = included?.find(
    (item) =>
      item.type === "contact-informations" &&
      item.id ===
        response.data?.relationships?.shipping_contact_information?.data?.id,
  );

  const orderItems =
    response.data?.relationships?.order_items?.data?.map((item) =>
      included?.find((includedItem) => includedItem?.id === item.id),
    ) || [];

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold">Order #{response.data.id}</h1>

      <h2 className="mb-4 mt-6 text-xl font-semibold">Order Details</h2>
      <div className="grid md:grid-cols-2">
        {Object.keys(attributes).map((key, index) => (
          <DisplayInfoText key={index} label={key}>
            {isDateString(attributes[key])
              ? new Date(attributes[key] as string).toLocaleDateString()
              : attributes[key]}
          </DisplayInfoText>
        ))}
      </div>

      <h2 className="mb-4 mt-6 text-xl font-semibold">Shipping Information</h2>
      <DisplayInfoText label="Name">
        {shippingContact?.attributes?.name}
      </DisplayInfoText>
      <DisplayInfoText label="Address">
        {shippingContact?.attributes?.address}
      </DisplayInfoText>
      <DisplayInfoText label="City">
        {shippingContact?.attributes?.city}
      </DisplayInfoText>
      <DisplayInfoText label="State">
        {shippingContact?.attributes?.state}
      </DisplayInfoText>
      <DisplayInfoText label="Zip">
        {shippingContact?.attributes?.zip}
      </DisplayInfoText>
      <DisplayInfoText label="Country">
        {shippingContact?.attributes?.country}
      </DisplayInfoText>
      <DisplayInfoText label="Email">
        {shippingContact?.attributes?.email}
      </DisplayInfoText>
      <DisplayInfoText label="Phone">
        {shippingContact?.attributes?.phone}
      </DisplayInfoText>

      <h2 className="mb-4 mt-6 text-xl font-semibold">Order Items</h2>
      {orderItems.map((item, index) => (
        <div key={index} className="mb-4 border-b pb-4">
          <DisplayInfoText label="Sku">{item?.attributes?.sku}</DisplayInfoText>
          <DisplayInfoText label="Name">
            {item?.attributes?.name}
          </DisplayInfoText>
          <DisplayInfoText label="Price">
            {item?.attributes?.price}
          </DisplayInfoText>
          <DisplayInfoText label="Quantity">
            {item?.attributes?.quantity}
          </DisplayInfoText>
        </div>
      ))}
    </>
  );
};
export default OrderDetail;
