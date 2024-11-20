import React, { Component } from "react";
import { Route,Switch } from "react-router-dom";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import Favorite from "./components/Favorite";
import AppContext from "./Context/AppContext"


class App extends Component {
  state = { isDarkTheme: false,favoriteList:[] }

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


  render() {
    const { isDarkTheme,favoriteList} = this.state
    return (
      <AppContext.Provider value={{
        isDarkTheme, toggleTheme: this.toggleTheme,favoriteList,onAddFavorite: this.onAddFavorite,onRemoveFavorite: this.onRemoveFavorite
      }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products/:id" component={ProductDetails} />
          <Route exact path="/favorite" component={Favorite} />
        </Switch>
      </AppContext.Provider>
    )
  }
}

export default App;