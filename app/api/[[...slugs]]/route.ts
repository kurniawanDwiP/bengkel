import { createOrderService, createServiceService } from "@/lib/container";
import { initDataSource } from "@/lib/db/init-db";
import { ApiResponseBuilder } from "@/lib/utils/Response";
import openapi, { fromTypes } from "@elysiajs/openapi";
import Elysia, { t } from "elysia";

type CreateOrderBody = {
  customer_name: string;
  contact?: string;
  items: Array<{
    service_id: string;
    quantity: number;
  }>;
};

const orderService = createOrderService();
const serviceService = createServiceService();
const app = new Elysia({ prefix: "/api" })
  .use(
    openapi({
      references: fromTypes(),
    }),
  )
  .get("/test", async () => {
    await initDataSource();
    const order = await orderService.getAllOrders();
    return new ApiResponseBuilder()
      .setSuccess(true)
      .setMessage("Order fetched successfully")
      .setData(order)
      .setStatus(200).build;
  })
  .get(
    "/test/:id",
    async ({ params }) => {
      await initDataSource();
      const { id } = params;
      const order = await orderService.getOrderById(id);
      return new ApiResponseBuilder()
        .setSuccess(true)
        .setMessage(`Order with id:${id} fetched successfully`)
        .setData(order)
        .setStatus(200)
        .build();
    },
    { params: t.Object({ id: t.String() }) },
  )
  .get("test/service", async () => {
    await initDataSource();
    const service = await serviceService.getAllServices();
    return new ApiResponseBuilder()
      .setSuccess(true)
      .setMessage("Service fetched successfully")
      .setData(service)
      .setStatus(200)
      .build();
  })
  .post(
    "/test",
    async ({ body }) => {
      await initDataSource();
      await orderService.createOrder(body as CreateOrderBody);
      return new ApiResponseBuilder()
        .setSuccess(true)
        .setMessage("Order created successfully")
        .setData(body)
        .setStatus(201)
        .build();
    },
    {
      body: t.Object({
        customer_name: t.String(),
        contact: t.Optional(t.String()),
        items: t.Array(
          t.Object({
            service_id: t.String(),
            quantity: t.Integer({ minimum: 1 }),
          }),
        ),
      }),
    },
  );

export const GET = app.fetch;
export const POST = app.fetch;
