import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaRegUser, FaRegMoon } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineFavoriteBorder, MdOutlineShoppingBag, MdOutlineWbSunny } from "react-icons/md";
import AppContext from "../../Context/AppContext";
import { IoSearchCircle } from "react-icons/io5";

import "./index.css";

class Header extends Component {

  renderFavItemsCount = () => (
    <AppContext.Consumer>
      {value => {
        const { favoriteList } = value
        const favItemsCount = favoriteList.length

        return (
          <>
            {favItemsCount > 0 ? (
              <span className="cartListCountBadge">{favoriteList.length}</span>
            ) : null}
          </>
        )
      }}
    </AppContext.Consumer>
  )

  renderCartItemsCount = () => (
    <AppContext.Consumer>
      {value => {
        const { cartList } = value
        const cartItemsCount = cartList.length

        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cartListCountBadge">{cartList.length}</span>
            ) : null}
          </>
        )
      }}
    </AppContext.Consumer>
  )
  render() {
    const { searchInput } = this.props

    const onChangeSearchInput = event => {
      const { changeSearchInput } = this.props
      changeSearchInput(event.target.value)
    }

    const onEnterSearchInput = event => {
      const { enterSearchInput } = this.props
      if (event.key === 'Enter') {
        enterSearchInput()
      }
    }

    return (
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
                <div className="search-container">
                  <IoSearchCircle size={25} onClick={this.handleSearchClick} />
                  <input type="search" className="searchInput" onChange={onChangeSearchInput} onKeyDown={onEnterSearchInput} value={searchInput} placeholder="Search for products..." />
                </div>
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
                    {this.renderFavItemsCount()}
                    <p className="navItemName">Favourite</p>
                  </Link>
                  <Link to="/cart" className={`nav-link ${themeClass}`}>
                    <li>
                      <MdOutlineShoppingBag className="navIcon" />
                    </li>
                    {this.renderCartItemsCount()}
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
    )
  }
}


export default Header;
