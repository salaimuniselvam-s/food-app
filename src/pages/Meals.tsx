/* eslint-disable @typescript-eslint/no-floating-promises */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Modal } from "antd";
import { fetchIndividualMeals } from "../redux/actions/fetchMealById";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import Loader from "../components/Loader";
import NotFound from "../components/NotFound";
import Button from "../components/Button";
import { Meal } from "../types/inteface";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../redux/reducers/cartItems";
import AddressForm from "../components/AddressForm";

const Meals = () => {
  const dispatch = useAppDispatch();
  const { meal } = useParams();
  const [isInCart, setIsInCart] = useState(false);
  const cartItems = useAppSelector((state) => state.cartItems);
  const mealById = useAppSelector((state) => state.getMealById);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);

  useEffect(() => {
    if (meal) dispatch(fetchIndividualMeals(meal));
  }, [meal, dispatch]);

  useEffect(() => {
    const isInCart = cartItems.carts.some(
      (cartItem) => cartItem.idMeal === meal
    );
    setIsInCart(isInCart);
  }, [meal, cartItems]);

  if (mealById.loading) return <Loader />;
  if (mealById.errorMessage) return <NotFound />;

  const addOrRemoveItemsFromCart = (meal: Meal) => {
    if (isInCart) {
      dispatch(removeItemsFromCart(meal.idMeal));
    } else {
      dispatch(addItemsToCart(meal));
    }
  };

  return (
    <div>
      {mealById.data.meals.map((meal) => {
        return (
          <div key={meal.idMeal}>
            <div>{meal.idMeal}</div>
            <div>{meal.strArea}</div>
            <div>{meal.strInstructions}</div>
            <div>{meal.strCategory}</div>
            <div>{meal.strTags}</div>
            <div>{meal.strYoutube}</div>
            <div className="m-6 flex gap-6">
              <Button
                title={isInCart ? "Remove from cart" : "Add to cart"}
                onClick={() => addOrRemoveItemsFromCart(meal)}
                restStyles="min-w-[190px]"
              />
              <Button title="Buy Now" onClick={showModal} />
            </div>
          </div>
        );
      })}
      {/* Add Address & Checkout Modal */}
      <Modal
        title="ADD A NEW ADDRESS"
        open={isModalOpen}
        footer={null}
        onOk={handleOk}
        onCancel={handleOk}
        destroyOnClose={true}
      >
        <AddressForm meal={mealById.data.meals} isCart={false} />
      </Modal>
    </div>
  );
};

export default Meals;
