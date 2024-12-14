import { Link } from "react-router-dom"
import { IoCloseCircleSharp } from "react-icons/io5";

import AppContext from "../../Context/AppContext";
import './index.css'


const FavoriteItem = (props) => {
    const { favProductData } = props
    const { title, price, thumbnail, id, rating, stock } = favProductData

    const productRating = String(rating).slice(0, 3);
    const stockAvailability = stock > 10 ? "" : "Only few Left"

    return (
        <AppContext.Consumer>
            {value => {
                const { isDarkTheme, onRemoveFavorite } = value

                const cardTheme = isDarkTheme ? "cardDark" : "cardLight"
                const priceColor = isDarkTheme ? "priceDark" : "priceLight"

                const onRemoveFavItem = () => {
                    onRemoveFavorite(id)
                }

                return (
                    <li className={`card ${cardTheme}`}>
                        <div className="removeFavContainer">
                            <button onClick={onRemoveFavItem} className="removeFavButton">
                                <IoCloseCircleSharp size={20} />
                            </button>
                        </div>
                        <div className="card-details">
                            <img src={thumbnail} alt={title} className="productImage" />
                            <p className="text-title">{title}</p>
                            <div className='price-rating-container'>
                                <p className={`price ${priceColor}`}>₹{price} /-</p>
                                <div className='rating-container'>
                                    <p className='product-rating'>{productRating}</p>
                                    <img
                                        src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                                        alt="star"
                                        className="star"
                                    />
                                </div>
                            </div>
                            <p className='stock'>{stockAvailability}</p>
                        </div>
                        <Link to={`/products/${id}`}>
                            <button className="card-button">More info</button>
                        </Link>
                    </li>
                )
            }}
        </AppContext.Consumer>
    )
}


export default FavoriteItem