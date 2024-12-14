import { Component } from "react";

import { Link } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import "./index.css"


class ProductItem extends Component {
  state = { isFavourite: false }

  onClickFavourite = () => {
    this.setState(prevState => ({ isFavourite: !prevState.isFavourite }))
  }
  render() {
    const {isFavourite} = this.state
    const { productItemData } = this.props
    const { title, price, thumbnail, id, rating, stock } = productItemData

    const productRating = String(rating).slice(0, 3);
    const stockAvailability = stock > 10 ? "" : "Only few Left"
    const productPrice = Math.floor(price)

    return (
      <AppContext.Consumer>
        {value => {
          const { isDarkTheme ,onAddFavorite,onRemoveFavorite} = value
          const cardTheme = isDarkTheme ? "cardDark" : "cardLight"
          const priceColor = isDarkTheme ? "priceDark" : "priceLight"

          const onClickAddFav = () => {
            onAddFavorite({ ...productItemData })
        }
      
        const onRemoveFavItem = () => {
          onRemoveFavorite(id)
        }

          return (
            <div className={`card ${cardTheme}`}>
              <div className="favIcon-container">
                {isFavourite ? (
                  <button className="favButton" type="button" onClick={onRemoveFavItem}>
                    <MdOutlineFavorite size={20} color="#e31310" className="favIcon" onClick={this.onClickFavourite} />
                  </button>
                ) : (
                  <button className="favButton" type="button" onClick={onClickAddFav}>
                    <MdOutlineFavoriteBorder size={20} className="favIcon" onClick={this.onClickFavourite} />
                  </button>
                )}
              </div>
              <div className="card-details">
                <img src={thumbnail} alt={title} className="productImage" />
                <p className="text-title">{title}</p>
                <div className='price-rating-container'>
                  <p className={`price ${priceColor}`}>₹{productPrice} /-</p>
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
}


export default ProductItem;
