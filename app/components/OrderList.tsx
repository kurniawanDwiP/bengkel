import { Order } from "@/lib/entities/Order";
import { TApiResponse } from "@/lib/utils/Response";

export default async function OrderList() {
  const res = await fetch("http://localhost:3000/api/orders");
  const data: TApiResponse<Order[]> = await res.json();
  const orders = data.data;
  return (
    <div className="flex flex-col gap-2 w-full">
      {orders.map((order) => (
        <div
          key={order.id}
          className="mx-auto px-2 flex flex-row bg-blue-400 rounded-lg gap-2 h-12 w-full justify-between items-center"
        >
          <h2>{order.customer_name}</h2>
          <p>Rp.{order.total}</p>
          <button
            type="submit"
            className="border border-white p-2 rounded-lg bg-blue-700"
          >
            detail
          </button>
        </div>
      ))}
    </div>
  );
}
