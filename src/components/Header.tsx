import React, { useState } from "react";
import { Badge } from "antd";
import { motion } from "framer-motion";
import Logo from "../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import Avatar from "../assets/avatar.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { pages } from "../utils/page-routes";
import { NavbarBadge, motionAnimateType } from "../types/inteface";
import useWindowDimension from "../hooks/useWindowDimension";
import { WEBSITE_NAME } from "../utils/constants";
import { useAppSelector } from "../redux/store/store";
import { motionAnimate } from "../utils/helpers";

const Header = () => {
  const cartItems = useAppSelector((state) => state.cartItems.carts);
  const orderedItems = useAppSelector((state) => state.orderedItems.orders);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { width } = useWindowDimension();

  const navigation = (route: string) => {
    // push to respective pages
    navigate(route);
    if (width < 768) setIsMobile(!isMobile);
  };

  return (
    <header className="fixed z-50 w-screen max-w-1600 mx-auto py-3 px-4 md:py-6 md:px-16 bg-primary">
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
                cartCount={cartItems.length}
                orderCartCount={orderedItems.length}
                activePath={location.pathname}
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
                      cartCount={cartItems.length}
                      orderCartCount={orderedItems.length}
                      activePath={location.pathname}
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
  activePath,
  cartCount,
  orderCartCount,
}) => {
  const activeNavbar =
    page.path === activePath
      ? `${className} relative before:absolute before:rounded-lg before:content before:min-w-full before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600`
      : className;

  // Adding Cart Items Count as Badge Count
  if (page.title === "Cart" || page.title === "Orders") {
    return (
      <Badge count={page.title === "Cart" ? cartCount : orderCartCount}>
        <li
          className={activeNavbar}
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
      className={activeNavbar}
      key={page.title}
      onClick={() => navigation(page.path)}
    >
      {page.title}
    </li>
  );
};

const AppTitle = React.memo(() => {
  const { width } = useWindowDimension();
  return (
    <Link to={"/"} className="flex items-center gap-2">
      <img src={Logo} className="w-8 object-cover" alt="logo" />
      {width > 320 && (
        <p className="text-headingColor sm:text-xl font-bold">{WEBSITE_NAME}</p>
      )}
    </Link>
  );
});

const UserProfile = React.memo(({ motionAnimate }: motionAnimateType) => {
  return (
    <motion.img
      {...motionAnimate}
      src={Avatar}
      className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full"
      alt="userprofile"
    />
  );
});
