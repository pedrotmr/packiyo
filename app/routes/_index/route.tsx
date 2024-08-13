import { MetaFunction } from "@remix-run/node";
import RecursiveRouteLink from "./RecursiveRouteLink";

export const meta: MetaFunction = () => [
  { title: "Packiyo" },
  { name: "description", content: "Welcome to Packiyo!" },
];

export const routes = [
  {
    to: "/products",
    label: "Products",
    routes: [{ to: "/products/create", label: "Create Product", routes: [] }],
  },
  {
    to: "/orders",
    label: "Orders",
    routes: [{ to: "/orders/create", label: "Create Order", routes: [] }],
  },
];

const Home = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl">Welcome to Packiyo</h1>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        {routes.map((route) => (
          <RecursiveRouteLink key={route.to} route={route} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
