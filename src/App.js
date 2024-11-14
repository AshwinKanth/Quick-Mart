import React, { Component } from "react";
import { Route,Switch } from "react-router-dom";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import AppContext from "./Context/AppContext"


class App extends Component {
  state = { isDarkTheme: false }

  toggleTheme = () => {
    this.setState(prevState => ({ isDarkTheme: !prevState.isDarkTheme }));
  }
  render() {
    const { isDarkTheme } = this.state
    return (
      <AppContext.Provider value={{
        isDarkTheme, toggleTheme: this.toggleTheme,
      }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products/:id" component={ProductDetails} />
        </Switch>
      </AppContext.Provider>
    )
  }
}

export default App;