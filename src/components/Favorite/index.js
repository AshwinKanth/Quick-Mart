import { Link } from "react-router-dom";
import Header from "../Header";
import FavoriteItem from "../FavoriteItem";
import AppContext from "../../Context/AppContext";

import "./index.css"

const Favorite = () => (
    <AppContext.Consumer>
        {value => {
            const { isDarkTheme, favoriteList } = value
            const homeTheme = isDarkTheme ? 'dark' : 'light'

            const showEmptyView = favoriteList.length === 0

            return (
                <>
                    <Header />
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
                                <h1 className='fav-heading'>Favorites</h1>
                                <ul className='fav-list'>
                                    {favoriteList.map(eachFavItem => (
                                        <FavoriteItem key={eachFavItem.id} favProductData={eachFavItem} />
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </>
            )
        }}
    </AppContext.Consumer>
)

export default Favorite;