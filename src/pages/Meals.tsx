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
import { filterIngredients } from "../utils/helpers";
import { LiaShippingFastSolid } from "react-icons/lia";

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
    <section>
      {mealById.data.meals.map((meal) => {
        return (
          <div key={meal.idMeal}>
            <div className="py-1">
              <div className="flex w-full flex-col sm:flex-row bg-white shadow-lg rounded-lg h-auto">
                <div className="w-full sm:w-1/3 flex-grow">
                  <img
                    src={meal.strMealThumb}
                    className="object-cover rounded-s-md h-full"
                  />
                </div>
                <div className="w-full sm:w-2/3 flex flex-col relative p-4">
                  <h1 className="text-gray-900 font-bold text-xl sm:text-2xl">
                    {meal.strMeal}
                  </h1>
                  <h3 className="text-gray-700  mt-2 font-semibold text-lg sm:text-base">
                    {meal.strCategory} - {meal.strArea}
                  </h3>
                  <p className="mt-2 text-gray-600 text-sm">
                    {meal.strInstructions}
                  </p>
                  <div className="mt-2 font-semibold text-lg sm:text-base">
                    <span className="text-specialPrice">Special Price</span>{" "}
                    <br />
                    <span className="text-xl font-bold pr-1">
                      {"\u20B9"}
                      {meal.price}
                    </span>
                    <span>
                      <del className="text-gray-500">
                        {"\u20B9"}
                        {meal.discountedPrice}
                      </del>
                    </span>
                  </div>
                  <div>
                    <h3 className="text-gray-700  mt-2 font-semibold text-lg sm:text-base">
                      Ingredients
                    </h3>
                    <p>
                      {filterIngredients(meal).map((ingredient, index) => (
                        <span
                          key={ingredient + `${index}`}
                          className="inline-flex items-center mr-2 my-1 px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 capitalize"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="mt-3 flex-grow flex flex-col sm:flex-row justify-end items-end gap-3 sm:gap-6">
                    <Button
                      title={isInCart ? "Remove from cart" : "Add to cart"}
                      overRideColor={
                        isInCart
                          ? "bg-gradient-to-br from-red-500  to-red-600"
                          : undefined
                      }
                      onClick={() => addOrRemoveItemsFromCart(meal)}
                      restStyles="min-w-[190px]"
                    />
                    <Button title="Buy Now" onClick={showModal} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {/* Add Address & Checkout Modal */}
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
        <AddressForm meal={mealById.data.meals} isCart={false} />
      </Modal>
    </section>
  );
};

export default Meals;
