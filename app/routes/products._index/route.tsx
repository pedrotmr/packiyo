import { json } from "@remix-run/react";
import { getProducts } from "~/api/products";
import DefaultErrorBoundary from "~/ui/DefaultErrorBoundary";
import Layout from "./Layout";
import ProductsList from "./ProductsList";

export const loader = async () => {
  const products = await getProducts();
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
