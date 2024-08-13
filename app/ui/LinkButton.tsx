import { Link } from "@remix-run/react";
import { ReactNode } from "react";

const LinkButton = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link
    to={to}
    className="mb-4 rounded-md bg-violet-500 px-10 py-2 font-semibold text-white duration-200 hover:bg-violet-600 active:bg-violet-700"
  >
    {children}
  </Link>
);

export default LinkButton;
