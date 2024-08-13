import { MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import "./styles.css";
import LoadingSpinner from "./ui/LoadingSpinner";
import NavBar from "./ui/NavBar";

export const meta: MetaFunction = () => [
  { title: "Packiyo" },
  { name: "description", content: "Welcome to Packiyo!" },
];

const Root = () => {
  const navigation = useNavigation();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="overscroll-y-none">
        <NavBar />
        <div className="p-8">
          {navigation.state === "loading" ? <LoadingSpinner /> : <Outlet />}
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default Root;
