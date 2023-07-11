import React from "react";
import { Card } from "antd";
import { Meal } from "../types/inteface";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const MealCard: React.FC<{ meal: Meal }> = ({ meal }) => {
  const navigate = useNavigate();
  const navigation = (id: string) => navigate(`/meals/${id}`);

  return (
    <Card
      hoverable
      onClick={() => navigation(meal.idMeal)}
      style={{ width: 240 }}
      cover={<img alt={meal.strMeal} src={meal.strMealThumb} />}
    >
      <Meta title={meal.strMeal} description={meal.strCategory} />
    </Card>
  );
};

export default MealCard;
