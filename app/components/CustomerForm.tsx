"use client";

import { User, Phone } from "lucide-react";

interface CustomerFormProps {
  customerName: string;
  contact: string;
  onNameChange: (value: string) => void;
  onContactChange: (value: string) => void;
}

export function CustomerForm({
  customerName,
  contact,
  onNameChange,
  onContactChange,
}: CustomerFormProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <User className="w-5 h-5" />
        Informasi Pelanggan
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Pelanggan *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={customerName}
              onChange={(e) => onNameChange(e.target.value)}
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Masukkan nama pelanggan"
              required
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Wajib diisi untuk membuat pesanan
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kontak (Optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              value={contact}
              onChange={(e) => onContactChange(e.target.value)}
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="08xxxxxxxxxx"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Nomor WhatsApp atau telepon
          </p>
        </div>
      </div>
    </div>
  );
}
