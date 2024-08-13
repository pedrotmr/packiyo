import { ActionFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useRef } from "react";
import DefaultErrorBoundary from "~/ui/DefaultErrorBoundary";
import Stepper from "~/ui/Stepper";
import AddressForm from "./AddressForm";
import { createOrderAction } from "./create-order-action";
import OrderForm from "./OrderForm";
import SelectProduct from "./SelectProduct";

export const action: ActionFunction = createOrderAction;

const OrderCreate = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const steps = [
    { id: 1, title: "General Information", content: <OrderForm /> },
    { id: 2, title: "Address Information", content: <AddressForm /> },
    { id: 3, title: "Add Products", content: <SelectProduct /> },
  ];

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Create Order</h1>

      <Form method="post" ref={formRef}>
        <Stepper steps={steps} formRef={formRef} />
      </Form>
    </>
  );
};

export const ErrorBoundary = () => (
  <DefaultErrorBoundary>
    {`We're sorry, but we couldn't create the order at this time.`}
  </DefaultErrorBoundary>
);

export default OrderCreate;
