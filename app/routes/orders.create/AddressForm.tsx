import { useState } from "react";
import Input from "~/ui/Input";

const AddressForm = () => {
  const [sameAsShipping, setSameAsShipping] = useState(true);

  return (
    <>
      <h2 className="mb-4 text-sm font-bold uppercase text-gray-400">
        Shipping Contact Information
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Input label="Name" id="shipping_name" type="text" />
        <Input label="Company Name" id="shipping_company_name" type="text" />
        <Input label="Address" id="shipping_address" type="text" />
        <Input label="Address 2" id="shipping_address2" type="text" />
        <Input label="City" id="shipping_city" type="text" />
        <Input label="State" id="shipping_state" type="text" />
        <Input label="Zip" id="shipping_zip" type="text" />
        <Input label="Country" id="shipping_country" type="text" />
        <Input label="Email" id="shipping_email" type="email" />
        <Input label="Phone" id="shipping_phone" type="text" />
      </div>

      <div className="my-6 flex items-center">
        <input
          type="checkbox"
          id="different_billing_address"
          className="mr-2"
          onChange={() => setSameAsShipping(!sameAsShipping)}
        />
        <label
          htmlFor="different_billing_address"
          className="text-sm font-semibold"
        >
          Different Billing Address
        </label>
      </div>

      {!sameAsShipping && (
        <>
          <h2 className="mb-4 text-sm font-bold uppercase text-gray-400">
            Billing Contact Information
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Input label="Name" id="billing_name" type="text" />
            <Input label="Company Name" id="billing_company_name" type="text" />
            <Input label="Address" id="billing_address" type="text" />
            <Input label="Address 2" id="billing_address2" type="text" />
            <Input label="City" id="billing_city" type="text" />
            <Input label="State" id="billing_state" type="text" />
            <Input label="Zip" id="billing_zip" type="text" />
            <Input label="Country" id="billing_country" type="text" />
            <Input label="Email" id="billing_email" type="email" />
            <Input label="Phone" id="billing_phone" type="text" />
          </div>
        </>
      )}
    </>
  );
};

export default AddressForm;
