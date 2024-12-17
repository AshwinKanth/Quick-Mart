import { Component } from "react";
import Header from "../Header"
import CheckoutForm from '../CheckoutForm'
import CheckoutCarItem from "../CheckoutCartItem";
import AppContext from "../../Context/AppContext";

import "./index.css"


class Checkout extends Component {
    render() {
        return (
            <AppContext.Consumer>
                {value => {
                    const { cartList, isDarkTheme } = value
                    const homeTheme = isDarkTheme ? 'dark' : 'light'

                    let total = 0
                    cartList.forEach(eachItem => {
                        total += eachItem.price * eachItem.quantity
                    })

                    const totalAmount = Math.floor(total)
                    const totalDiscount = Math.floor((10/100) * total)
                    const totalAmountAterDiscount = Math.floor(totalAmount-totalDiscount)

                    return (
                        <div>
                            <Header />
                            <div className={`checkout-container ${homeTheme}`}>
                                <CheckoutForm />
                                <div className="checkoutCartList-summary-container">
                                    <ul className="checkoutCartList">
                                        {cartList.map(eachBook => (
                                            <CheckoutCarItem cartItemDetails={eachBook} key={eachBook.isbn13} />
                                        ))}
                                    </ul>
                                    <h1 className="order-total">Order Total: <span className="orderTotal-span">₹{totalAmount} /-</span></h1>
                                    <p >Discount 10%:<span className="orderDiscount"> - ₹{totalDiscount} /-</span></p>
                                    <p className="cartItems-count">{cartList.length} items in cart</p>
                                    <p className="deliveryText">Delivery Charges: <span className="deliveryTextSpan">FREE Delivery</span></p>
                                    <hr />
                                    <h1 className="order-total">Total Price: <span className="orderTotal-span">₹{totalAmountAterDiscount} /-</span></h1>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

export default Checkout