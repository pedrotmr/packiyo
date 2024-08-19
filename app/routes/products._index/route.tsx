import { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/react";
import { getProducts } from "~/api/products";
import DefaultErrorBoundary from "~/ui/DefaultErrorBoundary";
import Layout from "./Layout";
import ProductsList from "./ProductsList";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const perPage = url.searchParams.get("perPage") || "10";
  const params: URLSearchParams = new URLSearchParams({
    sort: "-created_at",
    "page[number]": page,
    "page[size]": perPage,
  });
  const products = await getProducts(params);
  return json(products);
};

const Products = () => (
  <Layout>
    <ProductsList />
  </Layout>
);

export const ErrorBoundary = () => (
  <DefaultErrorBoundary layout={Layout}>
    {`We're sorry, but we couldn't load the products at this time.`}
  </DefaultErrorBoundary>
);

export default Products;
