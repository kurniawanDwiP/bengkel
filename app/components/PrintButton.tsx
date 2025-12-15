"use client";

import { Order } from "@/lib/entities/Order";
import { OrderItem } from "@/lib/entities/OrderItem";

interface PrintButtonProps {
  order: Order & {
    items: OrderItem[];
  };
}

export const PrintButton = ({ order }: PrintButtonProps) => {
  const handlePrint = () => {
    // Logika print yang sudah kita buat sebelumnya
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Nota #${order.id.substring(0, 8)}</title>
        <style>
          @media print {
            @page { size: 80mm auto; margin: 0; }
            body { 
              width: 80mm !important; 
              margin: 0 auto !important; 
              padding: 2mm !important;
              font-family: 'Courier New', monospace !important;
              font-size: 11px !important;
            }
          }
          body { 
            width: 80mm; 
            margin: 0 auto; 
            padding: 2mm;
            font-family: 'Courier New', monospace;
            font-size: 11px;
          }
        </style>
      </head>
      <body>
        <div style="text-align: center; margin-bottom: 8px;">
          <h2 style="margin: 0;">Bengkel Serba Bisa</h2>
          <p style="margin: 2px 0; font-size: 10px;">Jl. Disana No. 123</p>
          <p style="margin: 2px 0; font-size: 10px;">Telp: 0812-0000-0000-0000</p>
          <hr style="border-top: 1px dashed #000; margin: 4px 0;">
        </div>
        
        <div style="margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between;">
            <span><strong>No. Nota:</strong></span>
            <span>${order.id.substring(0, 8)}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span><strong>Tanggal:</strong></span>
            <span>${new Date(order.created_at).toLocaleDateString("id-ID")}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span><strong>Waktu:</strong></span>
            <span>${new Date(order.created_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span><strong>Pelanggan:</strong></span>
            <span>${order.customer_name}</span>
          </div>
          ${
            order.contact
              ? `
          <div style="display: flex; justify-content: space-between;">
            <span><strong>Kontak:</strong></span>
            <span>${order.contact}</span>
          </div>
          `
              : ""
          }
          <hr style="border-top: 1px dashed #000; margin: 4px 0;">
        </div>
        
        <div style="margin-bottom: 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="text-align: left; border-bottom: 1px solid #000; padding: 2px 0;">Layanan</th>
                <th style="text-align: center; border-bottom: 1px solid #000; padding: 2px 0;">Qty</th>
                <th style="text-align: right; border-bottom: 1px solid #000; padding: 2px 0;">Harga</th>
              </tr>
            </thead>
            <tbody>
              ${
                order.items
                  ?.map(
                    (item) => `
                <tr>
                  <td style="padding: 2px 0;">${item.service_name}</td>
                  <td style="text-align: center; padding: 2px 0;">${item.quantity}</td>
                  <td style="text-align: right; padding: 2px 0;">Rp${(Number(item.price) * item.quantity).toLocaleString("id-ID")}</td>
                </tr>
              `,
                  )
                  .join("") || ""
              }
            </tbody>
          </table>
          <hr style="border-top: 1px dashed #000; margin: 4px 0;">
        </div>
        
        <div>
          <div style="display: flex; justify-content: space-between;">
            <span>Subtotal:</span>
            <span>Rp${order.items?.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0).toLocaleString("id-ID") || "0"}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-weight: bold; margin-top: 4px;">
            <span>TOTAL:</span>
            <span>Rp${order.total.toLocaleString("id-ID")}</span>
          </div>
          <hr style="border-top: 1px dashed #000; margin: 8px 0 4px 0;">
        </div>
        
        <div style="text-align: center; font-size: 10px; margin-top: 8px;">
          <p>Terima kasih atas kunjungan Anda</p>
          <p>***</p>
        </div>
        
        <script>
          window.onload = function() {
            setTimeout(() => {
              window.print();
              setTimeout(() => window.close(), 500);
            }, 500);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(content);
    printWindow.document.close();
  };

  return (
    <button
      onClick={handlePrint}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
        />
      </svg>
      Cetak Nota
    </button>
  );
};
