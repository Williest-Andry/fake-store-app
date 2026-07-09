import { NavLink, type NavLinkRenderProps } from "react-router";
import { logout, useAuthStore } from "../store/auth.store";
import Brand from "./brand";
import Cart from "/shopping-bag-64.png";
import User from "/user.png";
import Logout from "/logout.png";
import BurgerMenu from "/burger-bar.png";
import Close from "/reject.png";
import { useState } from "react";

export default function Navbar() {
  const { username } = useAuthStore();

  const [showMobileNavigation, setShowMobileNavigation] = useState(false);

  const isActiveLink = ({ isActive }: NavLinkRenderProps) => {
    return isActive ? "text-gray-400" : "";
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <>
      <nav className="font-work flex items-center justify-between min-[855px]:gap-40 text-xl h-15 border border-b-gray-200 px-10 min-[855px]:px-20">
        <div className="flex items-center gap-4 min-[855px]:gap-20">
          <NavLink to={"/products"}>
            <Brand />
          </NavLink>
          <div className="hidden sm:flex items-center gap-2 min-[855px]:gap-8 text-sm min-[1030px]:text-lg">
            <NavLink to={"/products"} className={isActiveLink}>
              Home
            </NavLink>
            <NavLink
              to={"/create-product"}
              className={isActiveLink + " not-min-[974px]:w-30"}
            >
              Create product
            </NavLink>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 min-[855px]:gap-8">
          <div className="flex items-center gap-2 text-gray-500">
            <p className="text-sm min-[855px]:text-xl">{username}</p>
            <div className="flex w-7 h-7">
              <img
                src={User}
                alt="user icon"
                className="w-full h-full object-scale-down"
              />
            </div>
          </div>

          <div className="flex items-center justify-center w-9 h-9">
            <NavLink to={"/my-cart"}>
              <img
                src={Cart}
                alt="cart icon"
                className="w-full h-full object-fill"
              />
            </NavLink>
          </div>

          <button className="w-9 h-9 cursor-pointer" onClick={handleLogout}>
            <img
              src={Logout}
              alt="logout icon"
              className="w-full h-full object-fill"
            />
          </button>
        </div>

        <div className="flex sm:hidden">
          <button
            className="cursor-pointer"
            onClick={() => setShowMobileNavigation(true)}
          >
            <img src={BurgerMenu} alt="buger menu icon" />
          </button>
        </div>
      </nav>
      {showMobileNavigation && (
        <div className="flex flex-col gap-20 items-center absolute z-100 top-0 bg-gray-300 w-full h-screen">
          <div className="flex mt-30">
            <div className="flex sm:hidden">
              <button
                className="cursor-pointer"
                onClick={() => setShowMobileNavigation(false)}
              >
                <img src={Close} alt="close menu icon" />
              </button>
            </div>
          </div>
          <div className="flex flex-col sm:hidden items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-gray-500">
              <p className="text-sm">{username}</p>
              <div className="flex w-7 h-7">
                <img
                  src={User}
                  alt="user icon"
                  className="w-full h-full object-scale-down"
                />
              </div>
            </div>

            <div className="flex items-center justify-center w-9 h-9">
              <NavLink to={"/my-cart"}>
                <img
                  src={Cart}
                  alt="cart icon"
                  className="w-full h-full object-fill"
                />
              </NavLink>
            </div>

            <button className="w-9 h-9 cursor-pointer" onClick={handleLogout}>
              <img
                src={Logout}
                alt="logout icon"
                className="w-full h-full object-fill"
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
