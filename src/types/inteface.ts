export interface addressForm {
  Address: string;
  Name: string;
  city: string;
  phone: string;
  prefix: string;
  state: string;
}

export interface NavbarBadge {
  page: { title: string; path: string };
  navigation: (route: string) => void;
  className: string;
  cartCount: number;
  activePath: string;
  orderCartCount: number;
}

export interface AddressFormType {
  meal: Meal[];
  isCart: boolean;
}

export type ButtonPropsCustom = {
  onClick?: () => void;
  title: string;
  restStyles?: string;
  overRideColor?: string;
};

export interface MealsState {
  loading: boolean;
  data: { meals: Meal[] };
  errorMessage: string | null;
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strIngredient16: string | null;
  strIngredient17: string | null;
  strIngredient18: string | null;
  strIngredient19: string | null;
  strIngredient20: string | null;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string | null;
  strMeasure17: string | null;
  strMeasure18: string | null;
  strMeasure19: string | null;
  strMeasure20: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
  price: number;
  discountedPrice: number;
}

export type motionAnimateType = {
  motionAnimate: {
    initial: { opacity: number; x: number };
    animate: { opacity: number; x: number };
    exit: { opacity: number; x: number };
  };
};

export interface MealCardType {
  meal: Meal;
  addOrRemoveItemsFromCart: (meal: string) => void;
}

export interface AllMealsType {
  refreshFood: () => void;
  addOrRemoveItemsFromCart: (meal: string) => void;
}
