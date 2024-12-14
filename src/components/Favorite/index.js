import { Link } from "react-router-dom";
import Header from "../Header";
import FavoriteItem from "../FavoriteItem";
import ProductItem from "../ProductItem";
import AppContext from "../../Context/AppContext";

import "./index.css"

const Favorite = ({ searchInput, changeSearchInput }) => (
    <AppContext.Consumer>
        {value => {
            const { isDarkTheme, favoriteList, productsData } = value
            const homeTheme = isDarkTheme ? 'dark' : 'light'

            const showEmptyView = favoriteList.length === 0

            const showOnlyFavorites = searchInput === "";

            const processedProducts = showOnlyFavorites
                ? favoriteList
                : productsData
                    .filter(product =>
                        !favoriteList.some(fav => fav.id === product.id) &&
                        product.title.toLowerCase().includes(searchInput.toLowerCase())
                    );


            return (
                <>
                    <Header searchInput={searchInput}
                        changeSearchInput={changeSearchInput}
                    />
                    <div className={`fav-container ${homeTheme}`}>
                        {showEmptyView ? (
                            <div className="fav-empty-view-container">
                                <img
                                    src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1732093519/FavLogo_1_sv5zrk.png"
                                    className="fav-empty-img"
                                    alt="fav empty"
                                />
                                <h1 className="fav-empty-heading">Your Favorites Is Empty</h1>

                                <Link to="/">
                                    <button type="button" className="exploreButton">
                                        Explore
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                {processedProducts.length === 0 ? (
                                    <div className="no-products-view">
                                        <img
                                            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
                                            className="no-products-img"
                                            alt="no products"
                                        />
                                        <h1 className="no-products-heading">No Products Found</h1>
                                        <p className="no-products-description">
                                            We could not find any products.
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        {searchInput.length === 0 ? (
                                            <>
                                                <h1 className='fav-heading'>Favorites</h1>
                                                <ul className="fav-list">
                                                    {processedProducts.map(product => (
                                                        <FavoriteItem
                                                            key={product.id}
                                                            favProductData={product}
                                                        />
                                                    ))}
                                                </ul>
                                            </>
                                        ) : (
                                            <ul className="fav-list">
                                                {processedProducts.map(product => (
                                                    <ProductItem
                                                        key={product.id}
                                                        productItemData={product}
                                                    />
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div >
                </>
            )
        }}
    </AppContext.Consumer >
)

export default Favorite;