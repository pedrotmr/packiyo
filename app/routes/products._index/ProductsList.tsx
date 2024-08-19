import { Link, useLoaderData } from "@remix-run/react";
import { CUSTOMER_ID } from "~/api/api-handler";
import {
  Product,
  ProductResponse,
  SingleProductResponse,
} from "~/api/types/products";
import Paginator from "~/ui/Paginator";

type getImageProps = {
  response: ProductResponse | SingleProductResponse;
  product: Product;
  size: number;
};

export function getImage({ response, product, size }: getImageProps): string {
  const imageId = product.relationships?.product_images?.data[0]?.id;
  if (imageId && response.included) {
    const image = response.included.find((item) => item.id === imageId);
    if (image) {
      return image.attributes.source;
    }
  }
  return `https://via.placeholder.com/${size}`;
}

const ProductsList = () => {
  const data = useLoaderData<ProductResponse>();

  return (
    <div className="overflow-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left">Id</th>
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Sku</th>
            <th className="p-4 text-left">Customer</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((product) => (
            <tr
              key={product.id}
              className="border-b duration-300 hover:bg-indigo-50"
            >
              <td>
                <Link to={`/products/${product.id}`} className="block p-4">
                  {product.id}
                </Link>
              </td>
              <td>
                <Link to={`/products/${product.id}`} className="block p-4">
                  <img
                    src={getImage({ response: data, product, size: 32 })}
                    alt="Product placeholder"
                    className="size-8 rounded object-cover"
                  />
                </Link>
              </td>
              <td>
                <Link to={`/products/${product.id}`} className="block p-4">
                  {product.attributes.name}
                </Link>
              </td>
              <td>
                <Link to={`/products/${product.id}`} className="block p-4">
                  {product.attributes.sku}
                </Link>
              </td>
              <td className="p-4">{CUSTOMER_ID}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {data?.meta?.page && <Paginator paginationData={data?.meta?.page} />}
    </div>
  );
};

export default ProductsList;
