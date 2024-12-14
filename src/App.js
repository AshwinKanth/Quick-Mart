import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import Favorite from "./components/Favorite";
import Cart from "./components/Cart";
import ProductCategory from "./components/ProductCategory";
import Login from "./components/Login";
import Checkout from "./components/Checkout";
import OrderPlaced from "./components/OrderPlaced";
import AppContext from "./Context/AppContext"
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";


class App extends Component {
  state = {
    isDarkTheme: false,
    favoriteList: JSON.parse(localStorage.getItem('favoriteList')) || [],
    cartList: JSON.parse(localStorage.getItem('cartList')) || [],
    searchInput: '',
    productsData: [],
  }

  changeSearchInput = (newSearchInput) => {
    this.setState({ searchInput: newSearchInput });
  };

  componentDidUpdate(prevState) {
    if (prevState.favoriteList !== this.state.favoriteList) {
      localStorage.setItem("favoriteList", JSON.stringify(this.state.favoriteList));
    }

    if (prevState.cartList !== this.state.cartList) {
      localStorage.setItem("cartList", JSON.stringify(this.state.cartList));
    }
  }


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
        favoriteList: [...prevState.favoriteList, product],
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
      })
      )
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

  fetchProductsData = async () => {
    const response = await fetch(`https://dummyjson.com/products?limit=0`);
    if (response.ok) {
      const data = await response.json();
      const productsData = data.products.map((product) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        rating: product.rating,
        stock: product.stock,
      }));
      this.setState({ productsData });
    }
  };

  componentDidMount() {
    this.fetchProductsData();
  }


  render() {
    const { isDarkTheme, favoriteList, cartList, productsData, searchInput } = this.state

    return (
      <AppContext.Provider value={{
        isDarkTheme, toggleTheme: this.toggleTheme, favoriteList, onAddFavorite: this.onAddFavorite, onRemoveFavorite: this.onRemoveFavorite,
        cartList, addCartItem: this.addCartItem, removeCartItem: this.removeCartItem, removeAllCartItems: this.removeAllCartItems,
        IncrementCartItemQuantity: this.IncrementCartItemQuantity, decrementCartItemQuantity: this.decrementCartItemQuantity,
        searchInput,
        productsData,
      }}>
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products/:id" component={ProductDetails} />
          <ProtectedRoute exact path="/favorite" render={(props) => (
            <Favorite
              {...props}
              searchInput={this.state.searchInput}
              changeSearchInput={this.changeSearchInput}
            />
          )} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path='/products/category/:slug' component={ProductCategory} />
          <ProtectedRoute exact path="/checkout" component={Checkout} />
          <ProtectedRoute exact path="/orderSuccess" component={OrderPlaced} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </AppContext.Provider>
    )
  }
}

export default App;