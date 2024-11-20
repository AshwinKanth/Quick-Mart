import React, { Component } from "react";
import { Route,Switch } from "react-router-dom";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import Favorite from "./components/Favorite";
import Cart from "./components/Cart";
import AppContext from "./Context/AppContext"


class App extends Component {
  state = { isDarkTheme: false,favoriteList:[],cartList:[] }

  toggleTheme = () => {
    this.setState(prevState => ({ isDarkTheme: !prevState.isDarkTheme }));
  }

  onAddFavorite = (product) => {
    const { favoriteList } = this.state
    const productObject = favoriteList.find(eachItem => eachItem.id === product.id)
    if (productObject) {
      this.setState(prevState => ({
        favoriteList: prevState.favoriteList.map(eachProduct => {
          if (eachProduct.id === productObject.id) {
            return eachProduct
          }
          return eachProduct
        })
      }))
    } else {
      this.setState(prevState => ({
        favoriteList: [...prevState.favoriteList, product ],
      }))
    }
  }


  onRemoveFavorite = (id) => {
    const { favoriteList } = this.state
    const updatedFavList = favoriteList.filter(eachitem => eachitem.id !== id)
    this.setState({ favoriteList: updatedFavList })
  }

  addCartItem = (product) => {
    const { cartList } = this.state
    const productObject = cartList.find(eachItem => eachItem.id === product.id)

    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (eachCartItem.id === productObject.id) {
            const updatedQuantity = eachCartItem.quantity + product.quantity
            return { ...eachCartItem, quantity: updatedQuantity }
          }
          return eachCartItem
        })
      }))
    } else {
      const updatedCartList = [...cartList, product]
      this.setState({ cartList: updatedCartList })
    }
  }

  removeCartItem = (id) => {
    const { cartList } = this.state
    const updatedCartList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({ cartList: updatedCartList })
  }

  removeAllCartItems = () => {
    this.setState({ cartList: [] })
  }

  IncrementCartItemQuantity = (id) => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (id === eachItem.id) {
          const updatedQuantity = eachItem.quantity + 1
          return { ...eachItem, quantity: updatedQuantity }
        }
        return eachItem
      })
    }))
  }

  decrementCartItemQuantity = (id) => {
    const { cartList } = this.state
    const productObject = cartList.find(eachItem => eachItem.id === id)


    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (id === eachItem.id) {
            const updatedQuantity = eachItem.quantity - 1
            return { ...eachItem, quantity: updatedQuantity }
          }
          return eachItem
        })
      }))
    } else {
      this.removeCartItem(id)
    }
  }


  render() {
    const { isDarkTheme,favoriteList,cartList} = this.state
    return (
      <AppContext.Provider value={{
        isDarkTheme, toggleTheme: this.toggleTheme,favoriteList,onAddFavorite: this.onAddFavorite,onRemoveFavorite: this.onRemoveFavorite,
        cartList, addCartItem: this.addCartItem, removeCartItem: this.removeCartItem, removeAllCartItems: this.removeAllCartItems,
          IncrementCartItemQuantity: this.IncrementCartItemQuantity, decrementCartItemQuantity: this.decrementCartItemQuantity,
      }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products/:id" component={ProductDetails} />
          <Route exact path="/favorite" component={Favorite} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </AppContext.Provider>
    )
  }
}

export default App;