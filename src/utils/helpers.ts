import { Meal } from "../types/inteface";

export const motionAnimate = {
  initial: { opacity: 0, x: 200 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 200 },
};

function generateRandomNumberInRange(
  min: number,
  max: number,
  givenNumber: number
): number {
  // Normalize the given number to a range between 0 and 1
  const normalizedNumber = (givenNumber - min) / (max - min);

  // Set the seed based on the normalized number
  let seed = Math.floor(normalizedNumber * 123456789);

  // Generate a random number between 0 and 1
  const randomFraction = Math.sin(seed++) * 0.5 + 0.5;

  // Scale and shift the random fraction to the desired range
  const randomInRange = Math.floor(randomFraction * (max - min + 1)) + min;

  return randomInRange;
}

export const generatePriceForProducts = (products: { meals: Meal[] }) => {
  const productWithPrice = {
    meals: products.meals.map((product) => {
      return {
        ...product,
        price: generateRandomNumberInRange(150, 300, Number(product.idMeal)),
        discountedPrice: generateRandomNumberInRange(
          500,
          900,
          Number(product.idMeal)
        ),
      };
    }),
  };

  return productWithPrice;
};

export const filterIngredients = (items: Meal): string[] => {
  const Ingredients = [""];
  Object.entries(items).forEach(([key, value]) => {
    if (key.includes("strIngredient") && value) {
      Ingredients.push(String(value));
    }
  });
  return Ingredients.filter((item) => item !== "");
};
