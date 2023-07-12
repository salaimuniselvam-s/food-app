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
      style={{ width: 340 }}
      cover={<img alt={meal.strMeal} src={meal.strMealThumb} />}
    >
      <Meta title={meal.strMeal} />
      <div className="pt-2">
        <p>
          {meal.strCategory} - {meal.strArea}
        </p>
        <p className="pt-2">{meal.strInstructions.slice(0, 100)}...</p>
      </div>
    </Card>
  );
};

export default MealCard;
