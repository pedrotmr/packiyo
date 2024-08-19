import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "@remix-run/react";

type PaginationData = {
  currentPage: number;
  from: number;
  lastPage: number;
  perPage: number;
  to: number;
  total: number;
};

const Paginator = ({ paginationData }: { paginationData: PaginationData }) => {
  const { currentPage, from, lastPage, to, total } = paginationData;

  const { pathname } = useLocation();

  return (
    <div className="flex items-center justify-between py-5 text-sm">
      <span>
        Showing <span className="font-semibold">{from}</span> to{" "}
        <span className="font-semibold">{to}</span> of{" "}
        <span className="font-semibold">{total}</span> results
      </span>

      <div className="flex gap-2">
        {currentPage > 1 && (
          <Link
            to={`${pathname}?page=${currentPage - 1}`}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 font-semibold hover:bg-gray-50"
          >
            <ArrowLeftIcon strokeWidth={2} className="size-3" />
            <span>Previous</span>
          </Link>
        )}

        {currentPage < lastPage && (
          <Link
            to={`${pathname}?page=${currentPage + 1}`}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 font-semibold hover:bg-gray-50"
          >
            <span>Next</span>
            <ArrowRightIcon strokeWidth={2} className="size-3" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Paginator;
