import { MdFavoriteBorder } from "react-icons/md";
import AppContext from "../../Context/AppContext";
import "./index.css"

const ProductItem = props => {
  const { productItemData } = props
  const { title, price, image } = productItemData

  const productTitle = title.slice(0, 30)

  return (
    <AppContext.Consumer>
      {value => {
        const { isDarkTheme } = value
        const cardTheme = isDarkTheme ? "cardDark" : "cardLight"
        const priceColor = isDarkTheme? "priceDark" : "priceLight"

        return (
          <div className={`card ${cardTheme}`}>
            <div className="card-details">
              <img src={image} alt={title} className="productImage" />
              <p className="text-title">{productTitle}...</p>
              <div className="price-fav-container">
                <p className={`text-price ${priceColor}`}>₹ {price} /-</p>
                <button className="favButton" type="button"><MdFavoriteBorder size={20} /> </button>
              </div>
            </div>
            <button className="card-button">More info</button>
          </div>
        )
      }}
    </AppContext.Consumer>
  )
}


export default ProductItem;
