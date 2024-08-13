import { json } from "@remix-run/react";
import { getOrders } from "~/api/orders";
import DefaultErrorBoundary from "~/ui/DefaultErrorBoundary";
import Layout from "./Layout";
import OrdersList from "./OrdersList";

export const loader = async () => {
  const orders = await getOrders();
  return json(orders);
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
