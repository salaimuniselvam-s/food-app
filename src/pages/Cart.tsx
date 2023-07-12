import { useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { LiaShippingFastSolid } from "react-icons/lia";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { motion } from "framer-motion";
import { Card, Modal, Tooltip } from "antd";
import Button from "../components/Button";
import EmptyCart from "../assets/emptyCart.svg";
import { removeItemsFromCart } from "../redux/reducers/cartItems";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import AddressForm from "../components/AddressForm";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cartItems.carts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const removeFromCart = (id: string) => {
    dispatch(removeItemsFromCart(id));
  };

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);

  const navigation = (id: string) => navigate(`/meals/${id}`);

  return (
    <div className="md:w-fit mx-auto w-full">
      <Card
        title={
          <span className="inline-flex items-center gap-1">
            <AiOutlineShoppingCart className="inlne-flex" />{" "}
            <span>Shopping Cart</span>
          </span>
        }
      >
        {cartItems.length === 0 ? (
          // To show Empty cart
          <div className="w-full px-12 py-3 h-full flex flex-col items-center justify-center gap-6">
            <img src={EmptyCart} className="w-300" alt="empty cart" />
            <p className="text-xl text-textColor font-semibold">
              Add some items to your cart
            </p>
            <Button onClick={() => navigate("/")} title="Start Shopping" />
          </div>
        ) : (
          <>
            <div className="flex  flex-col gap-4">
              {cartItems.map((item) => {
                return (
                  <div
                    className="flex flex-col md:flex-row justify-around items-center gap-4 pb-2 mb-2 border-b-2"
                    key={item.idMeal}
                  >
                    <img
                      className="w-32 rounded-2xl"
                      src={item.strMealThumb}
                      alt={item.strMeal}
                    />
                    <div
                      className="p-3 font-semibold cursor-pointer"
                      onClick={() => navigation(item.idMeal)}
                    >
                      <p className="text-2xl ">{item.strMeal}</p>
                      <p className="pt-1 ">
                        {item.strCategory} - {item.strArea}
                      </p>
                      <p className="pt-2">
                        {item.strInstructions.slice(0, 100)}...
                      </p>
                    </div>
                    <Tooltip title="Remove From Cart">
                      <motion.div
                        whileTap={{ scale: 0.75 }}
                        onClick={() => removeFromCart(item.idMeal)}
                        className={`w-8 h-8 rounded-full bg-red-600 flex items-center transition-all 100s ease-in-out justify-center cursor-pointer hover:shadow-md mt-2`}
                      >
                        <MdShoppingBasket className="text-white" />
                      </motion.div>
                    </Tooltip>
                    <p>
                      <span className="text-xl font-bold px-3">
                        {"\u20B9"}
                        {item.price}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col items-end gap-3">
              <div className="font-semibold  w-full md:w-auto text-center text-xl">
                Total =
                <span className="text-xl font-bold px-2">
                  {"\u20B9"}
                  {cartItems.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.price,
                    0
                  )}
                </span>
              </div>
              <Button title="Checkout" onClick={showModal} />
            </div>
          </>
        )}
      </Card>
      <Modal
        title={
          <span className="inline-flex items-center gap-2">
            <LiaShippingFastSolid className="inlne-flex text-lg" />{" "}
            <span>Shipping Address</span>
          </span>
        }
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
