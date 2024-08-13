import Input from "~/ui/Input";

const OrderForm = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
    <Input label="Order Number" id="number" type="text" required />
    <Input label="Order Channel Name" id="order_channel_name" type="text" />
    <Input label="Ordered At" id="ordered_at" type="date" />
    <Input label="Hold Until" id="hold_until" type="date" />
    <Input label="Ship Before" id="ship_before" type="date" />
    <Input label="Shipping Cost" id="shipping" type="number" />
    <Input label="Tax" id="tax" type="number" step="0.01" />
    <Input label="Discount" id="discount" type="number" step="0.01" />
    <Input label="Packing Note" id="packing_note" type="text" />
    <Input label="Shipping Name" id="shipping_method_name" type="text" />
    <Input label="Shipping Code" id="shipping_method_code" type="text" />
    <Input label="Tags" id="tags" type="text" />
  </div>
);

export default OrderForm;
