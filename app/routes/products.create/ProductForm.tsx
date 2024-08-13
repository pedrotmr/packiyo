import Input from "~/ui/Input";

const ProductForm = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
    <Input label="SKU" id="sku" type="text" required />
    <Input label="Name" id="name" type="text" required />
    <Input label="Price" id="price" type="number" step={0.01} />
    <Input label="Cost" id="cost" type="number" step={0.01} />
    <Input label="Width" id="width" type="number" step={0.01} />
    <Input label="Height" id="height" type="number" step={0.01} />
    <Input label="Length" id="length" type="number" step={0.01} />
    <Input label="Weight" id="weight" type="number" step={0.01} />
    <Input label="Barcode" id="barcode" type="text" />
    <Input label="Replacement Value" id="value" type="number" step={0.01} />
    <Input label="Notes" id="notes" type="text" />
    <Input label="Tags" id="tags" type="text" />
    <Input label="Customs Price" id="customs_price" type="number" step={0.01} />
    <Input label="Customs Description" id="customs_description" type="text" />
    <Input label="Country of Origin" id="country_of_origin" type="text" />
    <Input label="HS Code" id="hs_code" type="text" />
  </div>
);

export default ProductForm;
