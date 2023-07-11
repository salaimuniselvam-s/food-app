import Button from "../components/Button";
import { useState } from "react";
import { Modal } from "antd";
import { removeItemsFromCart } from "../redux/reducers/cartItems";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import { Meal } from "../types/inteface";
import AddressForm from "../components/AddressForm";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cartItems.carts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const removeFromCart = (meal: Meal) => {
    dispatch(removeItemsFromCart(meal.idMeal));
  };

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  return (
    <div>
      {cartItems.map((item) => {
        return (
          <div key={item.idMeal}>
            <p>{item.idMeal}</p>
            <p>{item.strMeal}</p>
            <Button
              title="Remove from cart"
              onClick={() => removeFromCart(item)}
              restStyles="min-w-[190px]"
            />
            <Button title="Buy Products" onClick={showModal} />
          </div>
        );
      })}
      <Modal
        title="ADD A NEW ADDRESS"
        open={isModalOpen}
        footer={null}
        onOk={handleOk}
        onCancel={handleOk}
        destroyOnClose={true}
      >
        <AddressForm meal={cartItems} isCart={true} />
      </Modal>
    </div>
  );
};

export default Cart;
