import React from "react";
import { Link } from "react-router-dom";
import { FaRegUser, FaRegMoon } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineFavoriteBorder, MdOutlineShoppingBag, MdOutlineWbSunny } from "react-icons/md";
import AppContext from "../../Context/AppContext";
import Search from "../Search";

import "./index.css";

const Header = () => (
  <AppContext.Consumer>
    {value => {
      const { isDarkTheme, toggleTheme } = value

      const onClickToggleTheme = () => {
        toggleTheme();
      };

      const themeClass = isDarkTheme ? "dark-theme" : "light-theme";

      return (
        <nav className={`nav-container ${themeClass}`}>
          <div className="header-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1730715486/Quick_Mart_Logo_k3ztfu.png"
                alt="appLogo"
                className="logo"
              />
            </Link>
            <Search />
            <div className="nav-link smThemeIcon">
              <li onClick={onClickToggleTheme}>
                {isDarkTheme ? (<MdOutlineWbSunny className="navIcon" />) : (<FaRegMoon className="navIcon" />)}
              </li>
            </div>
            <ul className="navList-container">
              <div className="nav-link lgThemeIcon">
                <li onClick={onClickToggleTheme}>
                  {isDarkTheme ? (<MdOutlineWbSunny className="navIcon" />) : (<FaRegMoon className="navIcon" />)}
                </li>
              </div>
              <Link to="/" className={`nav-link homeIcon ${themeClass}`}>
                <li>
                  <AiOutlineHome className="navIcon" />
                </li>
              </Link>
              <Link to="/favorite" className={`nav-link ${themeClass}`}>
                <li>
                  <MdOutlineFavoriteBorder className="navIcon" />
                </li>
                <p className="navItemName">Favourite</p>
              </Link>
              <Link to="/cart" className={`nav-link ${themeClass}`}>
                <li>
                  <MdOutlineShoppingBag className="navIcon" />
                </li>
                <p className="navItemName">Cart</p>
              </Link>
              <Link to="/login" className={`nav-link ${themeClass}`}>
                <li>
                  <FaRegUser className="navIcon" />
                </li>
                <p className="navItemName">Login</p>
              </Link>
            </ul>
          </div>
        </nav>
      )
    }}
  </AppContext.Consumer>

);

export default Header;
