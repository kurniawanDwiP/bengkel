"use client";

import { Service } from "@/lib/entities/Service";
import { Trash2, Plus, Minus } from "lucide-react";

interface CartItemProps {
  item: {
    service_id: string;
    service_name: string;
    price: number;
    qty: number;
  };
  onAdd: (service: Partial<Service>) => void;
  onDecrease: (serviceId: string) => void;
  onRemove: (serviceId: string) => void;
}

export function CartItem({ item, onAdd, onDecrease, onRemove }: CartItemProps) {
  const itemTotal = item.price * item.qty;

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{item.service_name}</h4>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDecrease(item.service_id)}
              className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-lg font-bold min-w-[24px] text-center">
              {item.qty}
            </span>
            <button
              onClick={() => onAdd(item)}
              className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="text-gray-600">
            @ Rp{Number(item.price).toLocaleString("id-ID")}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-lg font-bold text-gray-900">
            Rp{itemTotal.toLocaleString("id-ID")}
          </div>
          <div className="text-sm text-gray-500">
            {item.qty} × Rp{item.price.toLocaleString("id-ID")}
          </div>
        </div>
        <button
          onClick={() => onRemove(item.service_id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
          title="Hapus dari keranjang"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
