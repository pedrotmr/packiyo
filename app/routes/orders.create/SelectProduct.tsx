import { useEffect, useMemo, useState } from "react";
import { CUSTOMER_ID } from "~/api/api-handler";
import { getProducts } from "~/api/products";
import { Product } from "~/api/types/products";

const SelectProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProducts();
      setProducts(res.data);
    };
    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.attributes.name.toLowerCase().includes(searchTerm),
      ),
    [products, searchTerm],
  );

  const handleProductSelect = (product: Product) => {
    if (!selectedProducts.some((selected) => selected.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  return (
    <div className="overflow-auto">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 w-full rounded-md border p-2"
      />
      {searchTerm.length > 0 && (
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Id</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Sku</th>
              <th className="p-4 text-left">Customer</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="cursor-pointer border-b duration-300 hover:bg-indigo-50"
                onClick={() => handleProductSelect(product)}
              >
                <td>{product.id}</td>
                <td>{product.attributes.name}</td>
                <td>{product.attributes.sku}</td>
                <td className="p-4">{CUSTOMER_ID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedProducts.length > 0 && (
        <>
          <h3 className="mt-6">Selected Products:</h3>
          {selectedProducts.map((product) => (
            <div key={product.id} className="my-4">
              <p>Id: {product.id}</p>
              <p>Name: {product.attributes.name}</p>
              <p>Sku: {product.attributes.sku}</p>
              <input
                type="hidden"
                name="selected_products"
                value={product.attributes.sku}
                required
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SelectProduct;
