import { useState } from "react";
import { motion } from "framer-motion";
import Logo from "../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import Avatar from "../assets/avatar.png";
import { Link } from "react-router-dom";
import { pages } from "../utils/page-routes";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

  const motionAnimate = {
    initial: { opacity: 0, x: 200 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 200 },
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold"> Meals App</p>
        </Link>

        <div className="flex items-center gap-4">
          <motion.ul
            {...motionAnimate}
            className="flex items-center gap-12 px-12"
          >
            {pages.map((page) => {
              return (
                <li
                  className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                  key={page.title}
                >
                  {page.title}
                </li>
              );
            })}
          </motion.ul>

          <motion.img
            {...motionAnimate}
            src={Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full"
            alt="userprofile"
          />
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full ">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold"> Meals App</p>
        </Link>

        <div className="relative inline-flex gap-8">
          <motion.img
            {...motionAnimate}
            src={Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full"
            alt="userprofile"
          />
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
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                <ul className="flex flex-col">
                  {pages.map((page) => {
                    return (
                      <li
                        className="text-base text-textColor  duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2"
                        key={page.title}
                      >
                        {page.title}
                      </li>
                    );
                  })}
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
