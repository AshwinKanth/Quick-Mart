import { IoTrashBin } from "react-icons/io5";
import { FaRegMinusSquare, FaPlusSquare } from "react-icons/fa";
import AppContext from "../../Context/AppContext"
import "./index.css"


const CartItem = (props) => (

    <AppContext.Consumer>
        {value => {
            const { removeCartItem, IncrementCartItemQuantity, decrementCartItemQuantity,isDarkTheme } = value

            const { cartItemDetails } = props
            const { images, price, title, quantity, id } = cartItemDetails
            
            const onDecrement = () => {
                decrementCartItemQuantity(id)
            }

            const onIncrement = () => {
                IncrementCartItemQuantity(id)
            }

            const onRemoveCartItem = () => {
                removeCartItem(id)
            }

            const cardTheme = isDarkTheme ? "cardDark" : "cardLight"


            return (
                <li className={`cart-item ${cardTheme}`}>
                    <img src={images} alt={title} className='cart-product-image'/>
                    <div className='cart-item-details-container'>
                            <p className='cart-product-title'>{title}</p>
                        <div className='cart-quantity-container'>
                            <button className='quantity-controller-button' type='button' onClick={onDecrement}>
                                <FaRegMinusSquare size={20}/>
                            </button>
                            <p className='cart-quantity'>{quantity}</p>
                            <button className='quantity-controller-button' type='button' onClick={onIncrement}>
                                <FaPlusSquare size={20}/>
                            </button>
                        </div>
                        <div className='total-price-remove-container'>
                            <p className='cart-total-price'>$ {price * quantity} /-</p>
                            <button className='remove-button' type='button' onClick={onRemoveCartItem}>
                                Remove
                            </button>
                        </div>
                    </div>
                    <button className='delete-button' type='button' onClick={onRemoveCartItem}>
                    <IoTrashBin  size={20} />
                    </button>
                </li>
            )
        }}
    </AppContext.Consumer>
)

export default CartItem