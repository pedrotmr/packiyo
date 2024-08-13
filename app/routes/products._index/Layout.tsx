import { ReactNode } from "react";
import LinkButton from "~/ui/LinkButton";

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <div className="flex justify-between">
      <h1 className="text-2xl font-bold">Products</h1>
      <LinkButton to="/products/create">Create Product</LinkButton>
    </div>
    {children}
  </>
);

export default Layout;
