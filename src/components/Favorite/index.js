import Header from "../Header";
import FavoriteItem from "../FavoriteItem";
import AppContext from "../../Context/AppContext";

import "./index.css"

const Favorite = () => (
    <AppContext.Consumer>
        {value => {
            const { isDarkTheme,favoriteList } = value
            const homeTheme = isDarkTheme ? 'dark' : 'light'

            return (
                <>
                    <Header />
                    <div className={`fav-container ${homeTheme}`}>
                        <div>
                            <h1 className='fav-heading'>Favourites</h1>
                            <ul className='fav-list'>
                                {favoriteList.map(eachFavItem => (
                                    <FavoriteItem key={eachFavItem.id} favProductData={eachFavItem} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            )
        }}
    </AppContext.Consumer>
)

export default Favorite;