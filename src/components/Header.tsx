import React, { useState } from "react";
import { Badge } from "antd";
import { motion } from "framer-motion";
import Logo from "../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import Avatar from "../assets/avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { pages } from "../utils/page-routes";
import { NavbarBadge, motionAnimate } from "../types/inteface";
import useWindowDimension from "../hooks/useWindowDimension";
import { WEBSITE_NAME } from "../utils/constants";
import { useAppSelector } from "../redux/store/store";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { width } = useWindowDimension();

  const motionAnimate = {
    initial: { opacity: 0, x: 200 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 200 },
  };

  const navigation = (route: string) => {
    // push to respective pages
    navigate(route);
    if (width < 768) setIsMobile(!isMobile);
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <AppTitle />
        <div className="flex items-center gap-4">
          <motion.ul
            {...motionAnimate}
            className="flex items-center gap-12 px-12"
          >
            {pages.map((page) => (
              <NavbarWithBadge
                page={page}
                key={page.title}
                navigation={navigation}
                className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              />
            ))}
          </motion.ul>
          <UserProfile motionAnimate={motionAnimate} />
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden  w-full h-full ">
        <AppTitle />
        <div className="relative inline-flex gap-8">
          <UserProfile motionAnimate={motionAnimate} />
          <div>
            <motion.button
              {...motionAnimate}
              onClick={() => setIsMobile(!isMobile)}
              type="button"
              className="text-white inline-flex  rounded-md bg-gradient-to-br from-orange-400 to-orange-500 p-2 cursor-pointer"
              aria-expanded="false"
            >
              <GiHamburgerMenu className="text-2xl" />
            </motion.button>

            {isMobile && (
              <motion.div
                // refactor
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                <ul className="flex flex-col gap-3">
                  {pages.map((page) => (
                    <NavbarWithBadge
                      page={page}
                      key={page.title}
                      navigation={navigation}
                      className="text-base text-textColor  duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2"
                    />
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

const NavbarWithBadge: React.FC<NavbarBadge> = ({
  page,
  navigation,
  className,
}) => {
  const cartItems = useAppSelector((state) => state.cartItems.carts);

  // Adding Cart Items Count as Badge Count
  if (page.title === "Cart") {
    return (
      <Badge count={cartItems.length}>
        <li
          className={className}
          key={page.title}
          onClick={() => navigation(page.path)}
        >
          {page.title}
        </li>
      </Badge>
    );
  }
  return (
    <li
      className={className}
      key={page.title}
      onClick={() => navigation(page.path)}
    >
      {page.title}
    </li>
  );
};

const AppTitle = React.memo(() => {
  return (
    <Link to={"/"} className="flex items-center gap-2">
      <img src={Logo} className="w-8 object-cover" alt="logo" />
      <p className="text-headingColor sm:text-xl font-bold">{WEBSITE_NAME}</p>
    </Link>
  );
});

const UserProfile = React.memo(({ motionAnimate }: motionAnimate) => {
  return (
    <motion.img
      {...motionAnimate}
      src={Avatar}
      className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full"
      alt="userprofile"
    />
  );
});
