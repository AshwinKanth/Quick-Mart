import AppContext from '../../Context/AppContext'
import { Link } from 'react-router-dom'
import './index.css'

const CartSummary = () => (
    <AppContext.Consumer>
        {value => {
            const { cartList } = value
            let total = 0
            cartList.forEach(eachItem => {
                total += eachItem.price * eachItem.quantity
            })

            const totalAmount = total.toFixed(2)
            return (
                <div className="cartSummary-container">
                    <div className="total-container">
                        <h1 className="order-total">Order Total:</h1>
                        <h1 className="total">Rs {totalAmount}/-</h1>
                    </div>
                    <p className="items-count">{cartList.length} items in cart</p>
                    <Link to="/login">
                        <button type="button" className="checkout-button">
                            Checkout
                        </button>
                    </Link>
                </div>
            )
        }}
    </AppContext.Consumer>
)

export default CartSummary