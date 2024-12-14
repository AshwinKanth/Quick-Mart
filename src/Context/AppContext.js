import React from "react";


const AppContext = React.createContext({
    isDarkTheme: false,
    toggleTheme: () => { },
    favoriteList: [],
    onAddFavorite: () => { },
    onRemoveFavorite: () => { },

    cartList: [],
    addCartItem: () => { },
    removeCartItem: () => { },
    removeAllCartItems: () => { },
    IncrementCartItemQuantity: () => { },
    decrementCartItemQuantity: () => { },

    searchInput: '',
    changeSearchInput: () => { },

})


export default AppContext