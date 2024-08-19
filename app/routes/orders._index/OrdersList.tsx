import { Link, useLoaderData } from "@remix-run/react";
import { CUSTOMER_ID } from "~/api/api-handler";
import { OrderResponse } from "~/api/types/orders";
import Paginator from "~/ui/Paginator";

const OrdersList = () => {
  const data = useLoaderData<OrderResponse>();

  return (
    <div className="overflow-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left">Id</th>
            <th className="p-4 text-left">Number</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Customer</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((order) => (
            <tr
              key={order.id}
              className="border-b duration-300 hover:bg-indigo-50"
            >
              <td>
                <Link to={`/orders/${order.id}`} className="block p-4">
                  {order.attributes.number}
                </Link>
              </td>
              <td>
                <Link to={`/orders/${order.id}`} className="block p-4">
                  {order.id}
                </Link>
              </td>

              <td>
                <Link to={`/orders/${order.id}`} className="block p-4">
                  {order.attributes.status_text}
                </Link>
              </td>
              <td>
                <Link to={`/orders/${order.id}`} className="block p-4">
                  {order.attributes.created_at
                    ? new Date(order.attributes.created_at).toLocaleDateString()
                    : ""}
                </Link>
              </td>
              <td className="p-4">{CUSTOMER_ID}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {data?.meta?.page && <Paginator paginationData={data?.meta?.page} />}
    </div>
  );
};

export default OrdersList;
