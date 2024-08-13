import { ReactNode } from "react";
import { snakeToCapitalCase } from "~/utils/snake-to-capital";

const DisplayInfoText = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  return (
    <p className="mb-2">
      <strong className="font-semibold text-gray-500">
        {snakeToCapitalCase(label)}:{" "}
      </strong>
      {children}
    </p>
  );
};

export default DisplayInfoText;
