import React from "react";


const AppContext = React.createContext({
    isDarkTheme: false,
    toggleTheme: () => {},
    favoriteList:[],
    onAddFavorite: () =>{},
    onRemoveFavorite: () =>{},

})


export default AppContext