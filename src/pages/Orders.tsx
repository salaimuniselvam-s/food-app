import { TiTick } from "react-icons/ti";
import { RiLuggageCartLine } from "react-icons/ri";
import { Card } from "antd";
import EmptyCart from "../assets/emptyCart.svg";
import { useAppSelector } from "../redux/store/store";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const orderedItems = useAppSelector((state) => state.orderedItems.orders);

  const navigation = () => navigate("/");

  return (
    <div className="md:w-fit mx-auto w-full">
      <Card
        title={
          <span className="inline-flex items-center gap-1">
            <RiLuggageCartLine className="inlne-flex" /> <span>My Orders</span>
          </span>
        }
      >
        {orderedItems.length === 0 ? (
          // To show Empty ordererd cart
          <div className="w-full px-12 py-3 h-full flex flex-col items-center justify-center gap-6">
            <img src={EmptyCart} className="w-300" alt="empty cart" />
            <p className="text-xl text-textColor font-semibold">
              You Have No Orders
            </p>
            <Button onClick={navigation} title="Start Shopping" />
          </div>
        ) : (
          <>
            <div className="flex  flex-col gap-4">
              {orderedItems.map((item, index) => {
                return (
                  <div
                    className={`flex flex-col md:flex-row justify-around items-center gap-4 pb-2 mb-2 ${
                      orderedItems.length !== index + 1 ? "border-b-2" : ""
                    }`}
                    key={item.idMeal}
                  >
                    <div className="font-semibold">
                      <img
                        className="w-40 rounded-2xl"
                        src={item.strMealThumb}
                        alt={item.strMeal}
                      />
                      <p className="pt-1 text-lg">{item.strMeal}</p>
                      <p className="pt-1 text-gray-600 text-sm">
                        {item.strCategory} - {item.strArea}
                      </p>
                    </div>
                    <div className="font-semibold self-start text-lg">
                      <p>{item.Name},</p>
                      <p>{item.Address},</p>
                      <p>{item.city},</p>
                      <p>{item.state}.</p>
                      <p>{item.phone}</p>
                    </div>
                    <div className="font-semibold flex items-center px-3 py-1 rounded-lg bg-green-500 text-white">
                      <TiTick className="text-lg" />
                      Ordererd
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default Orders;
