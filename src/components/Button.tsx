import React from "react";

type ButtonProps = {
  onClick?: () => void;
  title: string;
  restStyles?: string;
  overRideColor?: string;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  restStyles,
  overRideColor,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={` text-white ${
        // Override button color
        overRideColor
          ? overRideColor
          : "bg-gradient-to-br from-orange-500  to-orange-600"
      } w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 ${
        // to add additonal styles to button
        restStyles ? restStyles : ""
      }`}
    >
      {title}
    </button>
  );
};

export default Button;
