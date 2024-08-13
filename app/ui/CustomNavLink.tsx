import { NavLink } from "@remix-run/react";

const CustomNavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `text-md rounded-md px-3 py-2 font-semibold duration-300 hover:bg-violet-100 ${isActive ? "bg-violet-100" : ""}`
    }
  >
    {children}
  </NavLink>
);

export default CustomNavLink;
