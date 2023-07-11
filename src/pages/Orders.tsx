import { useAppSelector } from "../redux/store/store";

const Orders = () => {
  const orderedItems = useAppSelector((state) => state.orderedItems.orders);
  return (
    <div>
      {orderedItems.map((order) => {
        return (
          <div key={order.idMeal}>
            {order.Name}
            {order.Address}
            {order.idMeal} <p>{order.strCategory}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
