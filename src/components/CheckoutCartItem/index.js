import AppContext from "../../Context/AppContext"
import { IoCloseCircleSharp } from "react-icons/io5";

const CheckoutCarItem = (props) => {
    const { cartItemDetails } = props
    const { images, price, title, quantity,id } = cartItemDetails


    return (
        <AppContext.Consumer>
            {value => {
                const { removeCartItem } = value

                const onClickRemoveItem = () =>{
                    removeCartItem(id)
                }

                return (
                    <li className='cart-item'>
                        <img src={images} alt={title} className='cart-product-image' />
                        <div className='cart-item-details-container'>
                            <p className='cart-product-title'>{title}</p>
                            <p className='cart-total-price'>₹ {price * quantity} /-</p>
                        </div>
                        <button className='removeFavButton' onClick={onClickRemoveItem}>
                        <IoCloseCircleSharp size={20} />
                        </button>
                    </li>
                )
            }}

        </AppContext.Consumer>
    )
}

export default CheckoutCarItem