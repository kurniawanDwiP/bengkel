// components/OrderList.tsx
import { Order } from "@/lib/entities/Order";
import { OrderItem } from "@/lib/entities/OrderItem";
import { TApiResponse } from "@/lib/utils/Response";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

// Type untuk order dengan items
type OrderWithItems = Order & {
  items: OrderItem[];
};

export default async function OrderList() {
  const res = await fetch("http://localhost:3000/api/orders", {
    cache: "no-store",
    next: {
      tags: ["orders"],
    },
  });

  const data: TApiResponse<OrderWithItems[]> = await res.json();
  const orders = data.data || [];

  return (
    <div className="flex flex-col rounded-lg p-4 gap-3 w-full bg-white shadow-sm m-3">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold text-gray-800">Riwayat Pesanan</h1>
        <div className="text-sm text-gray-500">
          Total: {orders.length} pesanan
        </div>
      </div>
      {orders.length === 0 ? (
        <div className="text-center py-12 text-gray-500 border rounded-lg">
          <div className="text-4xl mb-2">📋</div>
          <p className="text-lg">Belum ada pesanan</p>
          <p className="text-sm mt-1">Pesanan akan muncul di sini</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors items-center shadow-sm"
            >
              <div className="flex flex-col">
                <h3 className="font-semibold text-gray-800 truncate">
                  {order.customer_name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">
                    {new Date(order.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(order.created_at).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {order.contact && (
                  <div className="mt-1">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      📞 {order.contact}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <div className="text-sm text-gray-600">Items:</div>
                <div className="font-medium">
                  {order.items?.length || 0} layanan
                </div>
              </div>

              <div className="text-center">
                <div className="font-bold text-lg text-gray-900">
                  Rp{order.total.toLocaleString("id-ID")}
                </div>
                <div className="text-xs text-gray-500 mt-1">Total bayar</div>
              </div>

              <div className="text-right">
                <Link
                  href={`/orders/${order.id}`}
                  className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link
        href="/"
        className="px-6 py-3 border border-gray-300 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
      >
        <Home className="w-4 h-4" />
        Kembali ke Menu Utama
      </Link>{" "}
    </div>
  );
}
