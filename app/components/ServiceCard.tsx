"use client";

import { Service } from "@/lib/entities/Service";
import { Plus, Minus } from "lucide-react";

interface ServiceCardProps {
  service: Service;
  quantity: number;
  onAdd: (service: Service) => void;
  onDecrease: (serviceId: string) => void;
}

export function ServiceCard({
  service,
  quantity,
  onAdd,
  onDecrease,
}: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow p-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 text-lg">
            {service.service_name}
          </h3>
          <p className="text-gray-600 mt-1">
            {service.description || "Layanan profesional"}
          </p>
          <div className="mt-2">
            <span className="text-2xl font-bold text-blue-600">
              Rp{Number(service.price).toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          {quantity > 0 ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onDecrease(service.id)}
                className="w-10 h-10 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors flex items-center justify-center"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-xl font-bold min-w-[30px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => onAdd(service)}
                className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors flex items-center justify-center"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAdd(service)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Tambah
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
