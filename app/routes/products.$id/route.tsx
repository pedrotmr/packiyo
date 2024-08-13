import { json, useLoaderData } from "@remix-run/react";
import { getProductDetails } from "~/api/products";
import { Attributes, SingleProductResponse } from "~/api/types/products";
import DefaultErrorBoundary from "~/ui/DefaultErrorBoundary";
import DisplayInfoText from "~/ui/DisplayInfoText";
import { isDateString } from "~/utils/is-date";
import { getImage } from "../products._index/ProductsList";

export const loader = async ({ params }: { params: { id: string } }) => {
  const product = await getProductDetails(params.id);
  return json(product);
};

const ProductDetail = () => {
  const response = useLoaderData<SingleProductResponse>();
  const attributes: Attributes = response.data.attributes;

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold">
        Product #{response.data.id}
      </h1>
      <img
        src={getImage({ response, product: response.data, size: 96 })}
        alt="Product placeholder"
        className="my-4 size-24 rounded object-cover"
      />
      <div className="grid md:grid-cols-2">
        {Object.keys(attributes).map((key, index) => (
          <DisplayInfoText key={index} label={key}>
            {isDateString(attributes[key])
              ? new Date(attributes[key] as string).toLocaleDateString()
              : attributes[key]}
          </DisplayInfoText>
        ))}
      </div>
    </>
  );
};

export const ErrorBoundary = () => (
  <DefaultErrorBoundary>
    {`We're sorry, but we couldn't load this product at this time.`}
  </DefaultErrorBoundary>
);

export default ProductDetail;
