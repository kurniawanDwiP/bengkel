// app/orders/[id]/page.tsx
import { notFound } from "next/navigation";
import { Order } from "@/lib/entities/Order";
import { OrderItem } from "@/lib/entities/OrderItem";
import { TApiResponse } from "@/lib/utils/Response";
import { OrderDetailClient } from "@/app/components/OrderPageClient";

type OrderWithItems = Order & {
  items: OrderItem[];
};

export default async function OrderDetailPage(
  props: PageProps<"/orders/[id]">,
) {
  const { id } = await props.params;

  // Fetch order dengan items
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${id}`,
    {
      cache: "no-store",
    },
  );

  const data: TApiResponse<OrderWithItems> = await res.json();
  const order = data.data;

  if (!order) {
    notFound();
  }

  // Format tanggal dan waktu di server side
  const orderDate = new Date(order.created_at);
  const formattedDate = orderDate.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = orderDate.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Hitung subtotal dari items di server side
  const subtotal =
    order.items?.reduce((sum, item) => {
      return sum + Number(item.price) * item.quantity;
    }, 0) || order.total;

  // Kirim data ke Client Component
  return (
    <OrderDetailClient
      order={order}
      formattedDate={formattedDate}
      formattedTime={formattedTime}
      subtotal={subtotal}
    />
  );
}
