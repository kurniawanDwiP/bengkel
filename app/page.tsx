"use client";

import { Service } from "@/lib/entities/Service";
import { TApiResponse } from "@/lib/utils/Response";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag, Package, AlertCircle, Search } from "lucide-react";
import { CustomerForm } from "./components/CustomerForm";
import { CartItem } from "./components/CartItem";
import { ServiceCard } from "./components/ServiceCard";
import { SummaryCard } from "./components/SummaryCard";

type CartItemType = {
  service_id: string;
  service_name: string;
  price: number;
  qty: number;
};

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Ambil list service dari backend
  useEffect(() => {
    async function fetchServices() {
      const res = await fetch("/api/service");
      const data: TApiResponse<Service[]> = await res.json();
      const serviceList = data.data || [];
      setServices(serviceList);
    }
    fetchServices();
  }, []);

  // Filter services berdasarkan search
  const filteredServices = services.filter((service) =>
    service.service_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Tambah qty
  const addToCart = (service: Service) => {
    const exists = cart.find((item) => item.service_id === service.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.service_id === service.id
            ? { ...item, qty: item.qty + 1 }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          service_id: service.id,
          service_name: service.service_name,
          price: Number(service.price),
          qty: 1,
        },
      ]);
    }
  };

  // Kurangi qty
  const decreaseQty = (service_id: string) => {
    const item = cart.find((i) => i.service_id === service_id);
    if (!item) return;

    if (item.qty === 1) {
      setCart(cart.filter((i) => i.service_id !== service_id));
    } else {
      setCart(
        cart.map((i) =>
          i.service_id === service_id ? { ...i, qty: i.qty - 1 } : i,
        ),
      );
    }
  };

  const removeFromCart = (service_id: string) => {
    setCart(cart.filter((i) => i.service_id !== service_id));
  };

  const total = cart.reduce((acc, item) => acc + item.qty * item.price, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  async function handleSubmitOrder() {
    if (!customerName.trim()) {
      alert("Masukkan nama pelanggan!");
      return;
    }

    if (cart.length === 0) {
      alert("Tambahkan layanan ke keranjang terlebih dahulu!");
      return;
    }

    setLoading(true);

    const payload = {
      customer_name: customerName.trim(),
      contact: contact.trim(),
      items: cart.map((item) => ({
        service_id: item.service_id,
        service_name: item.service_name,
        price: item.price,
        quantity: item.qty,
      })),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Gagal membuat order!");
      }

      // Reset form setelah sukses
      alert("✅ Order berhasil dibuat!");
      setCart([]);
      setCustomerName("");
      setContact("");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <ShoppingBag className="w-8 h-8 text-blue-600" />
                Bengkel Serba Bisa
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari layanan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Layanan</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {services.length}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Item di Keranjang</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalItems}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <ShoppingBag className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Sementara</p>
                  <p className="text-2xl font-bold text-blue-600">
                    Rp{total.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kolom kiri: Customer Form & Daftar Layanan */}
          <div className="lg:col-span-2 space-y-6">
            <CustomerForm
              customerName={customerName}
              contact={contact}
              onNameChange={setCustomerName}
              onContactChange={setContact}
            />

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Daftar Layanan
                </h2>
                <span className="text-sm text-gray-500">
                  {filteredServices.length} layanan tersedia
                </span>
              </div>

              {filteredServices.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-3">
                    <AlertCircle className="w-12 h-12 mx-auto" />
                  </div>
                  <p className="text-gray-500">
                    Tidak ada layanan yang ditemukan
                  </p>
                  {searchTerm && (
                    <p className="text-sm text-gray-400 mt-1">
                      Coba kata kunci lain
                    </p>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredServices.map((service) => {
                    const cartItem = cart.find(
                      (item) => item.service_id === service.id,
                    );
                    return (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        quantity={cartItem?.qty || 0}
                        onAdd={addToCart}
                        onDecrease={decreaseQty}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Kolom kanan: Summary & Keranjang */}
          <div className="space-y-6">
            {/* Summary Card di bagian atas */}
            <SummaryCard
              total={total}
              itemCount={cart.length}
              customerName={customerName}
              loading={loading}
              onCheckout={handleSubmitOrder}
            />

            {/* Keranjang Pesanan dipindahkan di bawah Summary Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Keranjang Pesanan
                </h2>
                {cart.length > 0 && (
                  <button
                    onClick={() => setCart([])}
                    className="text-sm text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors"
                  >
                    Kosongkan Keranjang
                  </button>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-gray-400 mb-3">
                    <ShoppingBag className="w-12 h-12 mx-auto" />
                  </div>
                  <p className="text-gray-500">Keranjang masih kosong</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Tambahkan layanan dari daftar di atas
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <CartItem
                      key={item.service_id}
                      item={item}
                      onAdd={() => {
                        const service = services.find(
                          (s) => s.id === item.service_id,
                        );
                        if (service) addToCart(service);
                      }}
                      onDecrease={decreaseQty}
                      onRemove={removeFromCart}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
