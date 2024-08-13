import { useRouteError } from "@remix-run/react";
import React from "react";

interface DefaultErrorBoundaryProps {
  layout?: React.ComponentType<{ children: React.ReactNode }>;
  children: React.ReactNode;
}

const DefaultErrorBoundary = ({
  layout: Layout,
  children,
}: DefaultErrorBoundaryProps) => {
  const error = useRouteError();

  const renderContent = () => (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-gray-100 py-44">
      <h1 className="text-3xl font-bold text-red-600">
        Oops! Something went wrong.
      </h1>
      <p className="text-lg text-gray-700">{children}</p>

      {error instanceof Error && (
        <p className="text-md text-red-500">{error.message}</p>
      )}
    </div>
  );

  if (Layout) {
    return <Layout>{renderContent()}</Layout>;
  }

  return renderContent();
};

export default DefaultErrorBoundary;
