"use client";

import { Order } from "@/lib/entities/Order";
import { OrderItem } from "@/lib/entities/OrderItem";
import { PrintButton } from "./PrintButton";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Phone,
  Receipt,
  Package,
  Download,
  Printer,
} from "lucide-react";
import Link from "next/link";

type OrderWithItems = Order & {
  items: OrderItem[];
};

interface OrderDetailClientProps {
  order: OrderWithItems;
  formattedDate: string;
  formattedTime: string;
  subtotal: number;
}

export function OrderDetailClient({
  order,
  formattedDate,
  formattedTime,
  subtotal,
}: OrderDetailClientProps) {
  const formatCurrency = (amount: number) => {
    return `Rp${amount.toLocaleString("id-ID")}`;
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(order, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `order-${order.id.substring(0, 8)}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handlePrintPage = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb dan Navigation */}
        <div className="mb-8">
          <Link
            href="/orders"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar Pesanan
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Detail Pesanan
              </h1>
              <p className="text-gray-600 mt-1">
                ID:{" "}
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                  {order.id}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="text-white">
                    <h2 className="text-2xl font-bold mb-2">
                      {order.customer_name}
                    </h2>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formattedDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{formattedTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-3xl font-bold text-white">
                      {formatCurrency(order.total)}
                    </div>
                    <p className="text-blue-100">Total Pembayaran</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Customer Info */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Receipt className="w-5 h-5" />
                    Informasi Pelanggan
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">
                        Nama Pelanggan
                      </p>
                      <p className="font-semibold text-gray-900">
                        {order.customer_name}
                      </p>
                    </div>
                    {order.contact && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Kontak
                        </p>
                        <p className="font-semibold text-gray-900">
                          {order.contact}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Item Pesanan
                  </h3>

                  {order.items && order.items.length > 0 ? (
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Layanan
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Harga Satuan
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Jumlah
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Subtotal
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {order.items.map((item, index) => {
                            const itemTotal =
                              Number(item.price) * item.quantity;
                            return (
                              <tr
                                key={item.id}
                                className="hover:bg-gray-50 transition-colors"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-md flex items-center justify-center">
                                      <span className="text-blue-700 font-semibold text-sm">
                                        {index + 1}
                                      </span>
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">
                                        {item.service_name}
                                      </div>
                                      <div className="text-xs text-gray-500 font-mono">
                                        ID: {item.service_id}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {formatCurrency(Number(item.price))}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    {item.quantity}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  {formatCurrency(itemTotal)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot className="bg-gray-50">
                          <tr>
                            <td
                              colSpan={3}
                              className="px-6 py-4 text-right text-sm font-medium text-gray-900"
                            >
                              Total:
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-gray-900 border-t">
                              {formatCurrency(order.total)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                      <div className="text-gray-400 mb-3">
                        <Package className="w-12 h-12 mx-auto" />
                      </div>
                      <p className="text-gray-500">
                        Tidak ada item dalam pesanan ini
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/orders"
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Daftar
              </Link>{" "}
              <PrintButton order={order} />
              <button
                onClick={handleExportJSON}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export JSON
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Ringkasan Pesanan
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">ID Pesanan</span>
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {order.id.substring(0, 8)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Tanggal</span>
                  <span className="font-medium">{formattedDate}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Waktu</span>
                  <span className="font-medium">{formattedTime}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Jumlah Item</span>
                  <span className="font-medium">
                    {order.items?.length || 0}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Total</span>
                  <span className="text-xl font-bold text-blue-600">
                    {formatCurrency(order.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Statistik
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">
                    {order.items?.length || 0}
                  </div>
                  <div className="text-sm text-blue-600">Total Item</div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">
                    {order.items?.reduce(
                      (sum, item) => sum + item.quantity,
                      0,
                    ) || 0}
                  </div>
                  <div className="text-sm text-green-600">Total Qty</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
