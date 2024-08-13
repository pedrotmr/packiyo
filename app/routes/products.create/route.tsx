import { ActionFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useRef } from "react";
import DefaultErrorBoundary from "~/ui/DefaultErrorBoundary";
import Stepper from "~/ui/Stepper";
import ImageDropzone from "./ImageDropzone";
import ProductForm from "./ProductForm";
import { createProductAction } from "./create-product-action";

export const action: ActionFunction = createProductAction;

const steps = [
  { id: 1, title: "Product Information", content: <ProductForm /> },
  { id: 2, title: "Upload Image", content: <ImageDropzone /> },
];

const CreateProduct = () => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Create Product</h1>
      <Form method="post" ref={formRef}>
        <Stepper steps={steps} formRef={formRef} />
      </Form>
    </>
  );
};

export const ErrorBoundary = () => (
  <DefaultErrorBoundary>
    {`We're sorry, but we couldn't create the product at this time.`}
  </DefaultErrorBoundary>
);

export default CreateProduct;
