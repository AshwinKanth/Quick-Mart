import React, { Component } from "react";
import Header from "./components/Header"
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
        <div>
          <Header />
        </div>
      </AppContext.Provider>
    )
  }
}

export default App;