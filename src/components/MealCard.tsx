import React from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { Card, Tooltip } from "antd";
import { MealCardType } from "../types/inteface";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/store/store";

const { Meta } = Card;

const MealCard: React.FC<MealCardType> = ({
  meal,
  addOrRemoveItemsFromCart,
}) => {
  const navigate = useNavigate();
  const navigation = (id: string) => navigate(`/meals/${id}`);
  const cartItems = useAppSelector((state) => state.cartItems.carts);
  const isCartItem = cartItems.find((item) => item.idMeal === meal.idMeal);

  return (
    <Card
      style={{ width: 340 }}
      className="hover:scale-105 transition-all 100s ease-in-out"
      cover={
        <img
          alt={meal.strMeal}
          className="w-full h-full object-cover rounded-md  cursor-pointer "
          onClick={() => navigation(meal.idMeal)}
          src={meal.strMealThumb}
        />
      }
    >
      <div className="cursor-pointer" onClick={() => navigation(meal.idMeal)}>
        <Meta title={meal.strMeal} />
        <p className="pt-2">
          {meal.strCategory} - {meal.strArea}
        </p>
        <p className="pt-2">{meal.strInstructions.slice(0, 100)}...</p>
      </div>
      <div className="py-2 flex justify-between">
        <p>
          <span className="text-specialPrice font-medium">Special Price</span>{" "}
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
        </p>
        <Tooltip title={isCartItem ? "Remove From Cart" : "Add To Cart"}>
          <motion.div
            whileTap={{ scale: 0.75 }}
            onClick={() => addOrRemoveItemsFromCart(meal.idMeal)}
            className={`w-8 h-8 rounded-full ${
              isCartItem ? "bg-red-600" : "bg-green-600"
            } flex items-center transition-all 100s ease-in-out justify-center cursor-pointer hover:shadow-md mt-2`}
          >
            <MdShoppingBasket className="text-white" />
          </motion.div>
        </Tooltip>
      </div>
    </Card>
  );
};

export default MealCard;
