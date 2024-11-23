const CheckoutCarItem = (props) => {
    const { cartItemDetails } = props
    const { images, price, title, quantity } = cartItemDetails


    return (
        <li className='cart-item'>
            <img src={images} alt={title} className='cart-product-image' />
            <div className='cart-item-details-container'>
                <p className='cart-product-title'>{title}</p>
                <p className='cart-total-price'>$ {price * quantity} /-</p>
            </div>
        </li>
    )
}

export default CheckoutCarItem