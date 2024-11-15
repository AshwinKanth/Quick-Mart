import { Link } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import "./index.css"

const ProductItem = props => {
  const { productItemData } = props
  const { title, price, thumbnail, id, rating, stock } = productItemData

  const productRating = String(rating).slice(0, 3);
  const stockAvailability = stock > 10 ? "" : "Only few Left"

  return (
    <AppContext.Consumer>
      {value => {
        const { isDarkTheme } = value
        const cardTheme = isDarkTheme ? "cardDark" : "cardLight"
        const priceColor = isDarkTheme ? "priceDark" : "priceLight"

        return (
          <div className={`card ${cardTheme}`}>
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
          </div>

        )
      }}
    </AppContext.Consumer>
  )
}


export default ProductItem;
