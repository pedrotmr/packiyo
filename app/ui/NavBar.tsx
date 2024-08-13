import { NavLink } from "@remix-run/react";
import { routes } from "~/routes/_index/route";
import CustomNavLink from "./CustomNavLink";

const NavBar = () => (
  <header className="flex h-16 items-center gap-12 bg-slate-50 px-10 shadow-md">
    <NavLink to="/">
      <img
        src="https://staging1.internal1.packiyo.com/img/packiyo-logo-on-transparent.png"
        alt="Packiyo"
        width={130}
        style={{ clipPath: "inset(30px 0% 30px 0px)" }}
      />
    </NavLink>
    <nav className="flex items-center gap-2">
      {routes.map((route) => (
        <CustomNavLink key={route.to} to={route.to}>
          {route.label}
        </CustomNavLink>
      ))}
    </nav>
  </header>
);

export default NavBar;
