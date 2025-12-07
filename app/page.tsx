"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [loading, setLoading] = useState(false);

  // Ambil list service dari backend
  useEffect(() => {
    async function fetchServices() {
      const res = await fetch("/api/service");
      const data = await res.json();
      setServices(data);
    }
    fetchServices();
  }, []);

  // Tambah qty
  const addToCart = (service) => {
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
  const decreaseQty = (service_id) => {
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

  const total = cart.reduce((acc, item) => acc + item.qty * item.price, 0);

  async function handleSubmitOrder() {
    if (!customerName) return alert("Masukkan nama pelanggan!");

    setLoading(true);

    const payload = {
      customer_name: customerName,
      items: cart.map((item) => ({
        service_id: item.service_id,
        service_name: item.service_name,
        price: item.price,
        quantity: item.qty,
      })),
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) return alert("Gagal membuat order!");

    alert("Order berhasil dibuat!");
    setCart([]);
    setCustomerName("");
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Kasir Bengkel</h1>

      {/* Nama Pelanggan */}
      <div className="mb-4">
        <label className="font-semibold">Nama Pelanggan</label>
        <input
          className="border p-2 w-full mt-1"
          placeholder="cth: Budi"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>

      {/* List Services */}
      <h2 className="font-semibold mb-2">Pilih Layanan</h2>
      <div className="flex flex-col gap-2">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex justify-between p-3 border rounded"
          >
            <div>
              <p className="font-semibold">{service.service_name}</p>
              <p className="text-sm text-gray-600">
                Rp {Number(service.price).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => addToCart(service)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Tambah
            </button>
          </div>
        ))}
      </div>

      {/* Cart */}
      <h2 className="font-semibold mt-6">Keranjang</h2>
      {cart.length === 0 && <p className="text-gray-500">Belum ada item.</p>}

      {cart.map((item) => (
        <div
          key={item.service_id}
          className="flex justify-between p-3 border mt-2 rounded"
        >
          <div>
            <p>{item.service_name}</p>
            <p className="text-sm text-gray-700">
              Rp {item.price.toLocaleString()} x {item.qty}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              className="px-2 bg-gray-300 rounded"
              onClick={() => decreaseQty(item.service_id)}
            >
              -
            </button>
            <button
              className="px-2 bg-gray-300 rounded"
              onClick={() => addToCart(item)}
            >
              +
            </button>
          </div>
        </div>
      ))}

      {/* Total */}
      <div className="mt-6 text-xl font-bold">
        Total: Rp {total.toLocaleString()}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmitOrder}
        disabled={loading || cart.length === 0}
        className="mt-4 bg-green-600 text-white w-full py-2 rounded"
      >
        {loading ? "Memproses..." : "Buat Order"}
      </button>
    </div>
  );
}
