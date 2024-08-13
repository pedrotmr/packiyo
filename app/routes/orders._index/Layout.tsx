import { ReactNode } from "react";
import LinkButton from "~/ui/LinkButton";

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <div className="flex justify-between">
      <h1 className="text-2xl font-bold">Orders</h1>
      <LinkButton to="/orders/create">Create Order</LinkButton>
    </div>
    {children}
  </>
);
export default Layout;
