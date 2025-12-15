"use client";

import { ShoppingCart, CreditCard, CheckCircle } from "lucide-react";
import Link from "next/link";

interface SummaryCardProps {
  total: number;
  itemCount: number;
  customerName: string;
  loading: boolean;
  onCheckout: () => void;
}

export function SummaryCard({
  total,
  itemCount,
  customerName,
  loading,
  onCheckout,
}: SummaryCardProps) {
  const canCheckout = customerName.trim() !== "" && itemCount > 0;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg border border-blue-200 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <ShoppingCart className="w-5 h-5" />
        Ringkasan Pesanan
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-blue-100">
          <span className="text-gray-600">Jumlah Item</span>
          <span className="font-semibold">{itemCount} item</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-blue-100">
          <span className="text-gray-600">Total Quantity</span>
          <span className="font-semibold">
            {/* Total quantity akan dihitung dari cart */}
          </span>
        </div>

        <div className="pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 text-sm">Subtotal</span>
            <span className="text-gray-600">
              Rp{total.toLocaleString("id-ID")}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-800 font-semibold">
              Total Pembayaran
            </span>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                Rp{total.toLocaleString("id-ID")}
              </div>
              <div className="text-sm text-gray-500">
                Termasuk pajak (jika ada)
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <button
            onClick={onCheckout}
            disabled={!canCheckout || loading}
            className={`
              w-full py-3 rounded-lg font-bold text-lg transition-all duration-200
              ${
                canCheckout
                  ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
              flex items-center justify-center gap-2
            `}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Memproses...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                Buat Pesanan
              </>
            )}
          </button>

          <Link
            href="/orders"
            className="block w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Lihat Riwayat Transaksi
          </Link>
        </div>

        {!customerName && itemCount > 0 && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-700 text-sm flex items-center gap-2">
              ⚠️ Masukkan nama pelanggan untuk melanjutkan
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
