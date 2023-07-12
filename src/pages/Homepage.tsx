/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from "react";
import { Input } from "antd";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Home from "../components/Home";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import MealCard from "../components/MealCard";
import Loader from "../components/Loader";
import { fetchAllMeals } from "../redux/actions/fetchAllMealsAction";
import Button from "../components/Button";
import { AllMealsType } from "../types/inteface";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../redux/reducers/cartItems";
import { motion, useScroll } from "framer-motion";

const { Search } = Input;

const Homepage = () => {
  const { scrollYProgress } = useScroll();
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");
  const cartItems = useAppSelector((state) => state.cartItems.carts);
  const allMeals = useAppSelector((state) => state.allMeals.data.meals);

  const onFieldClear = () => {
    // random meals api is only avaiable to patreon supporters
    // so i have chosen to fetch all meals starting "s" from  api..
    dispatch(fetchAllMeals("s"));
    setSearchValue("");
  };

  useEffect(() => {
    onFieldClear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = (value: string) => {
    if (!value) return;
    dispatch(fetchAllMeals(value));
  };

  const addOrRemoveItemsFromCart = (mealId: string) => {
    const isCartItem = cartItems.find((item) => item.idMeal === mealId);
    if (isCartItem) {
      dispatch(removeItemsFromCart(mealId));
    } else {
      const meal = allMeals.find((item) => item.idMeal === mealId);
      if (meal) dispatch(addItemsToCart(meal));
    }
  };

  return (
    <main>
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <Home />
      <section className="w-full my-6 top-10-meals">
        <div className="w-full flex sm:flex-row flex-col sm:gap-0 gap-8 items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-24 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
            Top 10 Meals
          </p>

          <Search
            placeholder="Search Meal"
            className="lg:w-460 md:w-350 sm:w-275 w-190 flex justify-center items-center outline-slate-800"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            onSearch={onSearch}
            enterButton
            allowClear={{
              clearIcon: (
                <AiOutlineCloseCircle
                  className="text-lg text-gray-500"
                  onClick={onFieldClear}
                />
              ),
            }}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-12 my-9 ">
          <AllMeals
            refreshFood={onFieldClear}
            addOrRemoveItemsFromCart={addOrRemoveItemsFromCart}
          />
        </div>
      </section>
    </main>
  );
};

export default Homepage;

const AllMeals: React.FC<AllMealsType> = ({
  refreshFood,
  addOrRemoveItemsFromCart,
}) => {
  const allMeals = useAppSelector((state) => state.allMeals);
  if (allMeals.loading) return <Loader />;
  if (allMeals.data.meals.length === 0) {
    return (
      <div className="h-300 grid place-content-center">
        <p className="p-2 font-semibold">Not Available Right Now...!</p>
        <Button title="Try a Different Meal..!" onClick={refreshFood} />
      </div>
    );
  }
  return (
    <>
      {allMeals.data.meals.map((meal) => {
        return (
          <MealCard
            meal={meal}
            key={meal.idMeal}
            addOrRemoveItemsFromCart={addOrRemoveItemsFromCart}
          />
        );
      })}
    </>
  );
};
