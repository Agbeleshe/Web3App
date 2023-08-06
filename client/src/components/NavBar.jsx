import { useState } from "react";
import logo from "../../images/logo.png";

import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt4 } from "react-icons/hi";

const NavBarItem = ({ title, classProps }) => {
  return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
};
const NavBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="mb:flex-[0.5] flex-initial justify-center items-center ">
        {/* Logo */}
        <img src={logo} alt="logo" className="w-32 cursor-pointer lg:mr-20" />
      </div>
      <ul className="md:flex hidden text-white flex-row justify-between items-center flex-initial">
        {["Market", "Exchange", "Help", "Wallet"].map((item, index) => (
          <NavBarItem key={index + item} title={item} />
        ))}
        <li className="bg-[#2952e3] py-2 px-7 m-4 rounded-full cursor-pointer hover:bg-[#1238c2] transition duration-100 ease-in-out">
          Login
        </li>
      </ul>

      {/* mobile devices navBar */}

      <div className="flex relative ">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}

        {/* toggle nave properties */}
        {toggleMenu && (
          <ul
            className="z-10 fixed top-0 -right-2 p-3 w-[70vw]  h-screen shadow-2xl md:hidden list-none 
          flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {["Market", "Exchange", "Help", "Wallet"].map(
              (item, index) => (
                <NavBarItem
                  key={index + item}
                  title={item}
                  classProps="my-2 text-lg"
                />
              )
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
