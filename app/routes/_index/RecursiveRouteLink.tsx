import { Link } from "@remix-run/react";

type RouteLinkProps = {
  to: string;
  label: string;
  routes: RouteLinkProps[];
};

const RecursiveRouteLink = ({ route }: { route: RouteLinkProps }) => (
  <li key={route.to}>
    <Link
      to={route.to}
      className="text-blue-700 underline visited:text-purple-900"
    >
      {route.label}
    </Link>
    {route.routes && (
      <ul className="mt-2 list-disc space-y-1 pl-6">
        {route.routes.map((subRoute) => (
          <RecursiveRouteLink key={subRoute.to} route={subRoute} />
        ))}
      </ul>
    )}
  </li>
);

export default RecursiveRouteLink;
