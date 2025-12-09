import OrderList from "../components/OrderList";

const OrderPage = async () => {
  return (
    <div className="flex items-start">
      <h2 className="text-2xl text-sky-300"></h2>
      <OrderList />
    </div>
  );
};

export default OrderPage;
