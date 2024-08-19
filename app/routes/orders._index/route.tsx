import { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/react";
import { getOrders } from "~/api/orders";
import DefaultErrorBoundary from "~/ui/DefaultErrorBoundary";
import Layout from "./Layout";
import OrdersList from "./OrdersList";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const perPage = url.searchParams.get("perPage") || "10";
  const params: URLSearchParams = new URLSearchParams({
    sort: "-created_at",
    "page[number]": page,
    "page[size]": perPage,
  });
  const products = await getOrders(params);
  return json(products);
};

const Orders = () => (
  <Layout>
    <OrdersList />
  </Layout>
);

export const ErrorBoundary = () => (
  <DefaultErrorBoundary layout={Layout}>
    {`We're sorry, but we couldn't load the orders at this time.`}
  </DefaultErrorBoundary>
);

export default Orders;
