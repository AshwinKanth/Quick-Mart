import { Component } from "react";
import Header from "../Header";
import { BsCart3 } from "react-icons/bs";
import { MdElectricBolt } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import LoaderView from "../LoaderView";
import FailureView from "../FailureView";
import "./index.css"
import AppContext from "../../Context/AppContext";

const apiStatusConstant = {
    success: "SUCCESS",
    inProgress: "INPROGRESS",
    failure: "FAILURE",
    initial: "INITIAL"
}

class ProductDetails extends Component {
    state = { productsDetailsData: [], quantity: 1, apiStatus: apiStatusConstant.initial }

    componentDidMount() {
        this.getProductDetails()
    }

    getFormattedData = (data) => ({
        image: data.product.image,
        title: data.product.title,
        price: data.product.price,
        description: data.product.description,
        brand: data.product.brand,
        category: data.product.category,
        color: data.product.color,
        model: data.product.model
    })

    getProductDetails = async () => {
        this.setState({ apiStatus: apiStatusConstant.inProgress })
        const { match } = this.props
        const { params } = match
        const { id } = params

        const apiUrl = `https://fakestoreapi.in/api/products/${id}`
        const options = {
            method: 'GET',
        }

        const productResponse = await fetch(apiUrl, options)

        if (productResponse.ok === true) {
            const fetchedData = await productResponse.json()
            const updatedData = this.getFormattedData(fetchedData)
            this.setState({ productsDetailsData: updatedData, apiStatus: apiStatusConstant.success })
        } else {
            this.setState({ apiStatus: apiStatusConstant.failure })
        }

    }


    onClickIncreaseQuantity = () => {
        this.setState(prevState => ({ quantity: prevState.quantity + 1 }))
      }
    
      onClickDecreaseQuantity = () => {
        const { quantity } = this.state
        if (quantity > 1) {
          this.setState(prevState => ({ quantity: prevState.quantity - 1 }))
        }
      }



    renderProductDetails = () => {
        const { productsDetailsData, quantity } = this.state
        const { title, image, price, description, brand, category, color, model } = productsDetailsData

        return (
            <AppContext.Consumer>
                {value => {
                    const { isDarkTheme } = value

                    const homeTheme = isDarkTheme ? 'dark' : 'light'

                    return (
                        <div className={`productDetails ${homeTheme}`}>
                            <div className="image-buttons-container">
                                <img src={image} alt={title} className="image" />
                                <div className="buttons-container">
                                    <button type="button" className="buttons addCart" onClick={this.onClickAddCart}><BsCart3 size={14} /> ADD TO CART</button>
                                    <button type="button" className="buttons buyNow"> <MdElectricBolt size={14} /> BUY NOW</button>
                                </div>
                            </div>
                            <div className="productInformation-container">
                                <h1 className="title">{title}</h1>
                                <p className="productDescription">{description}</p>
                                <div className="priceDetails-container">
                                    <p className="productDetailsPrice">₹{price} /- </p>
                                </div>
                                <div className="quantity-container">
                                    <button className="quantityButton" type="button" onClick={this.onClickDecreaseQuantity}>
                                        <CiCircleMinus size={20} />
                                    </button>
                                    <p>{quantity}</p>
                                    <button className="quantityButton" type="button" onClick={this.onClickIncreaseQuantity}>
                                        <CiCirclePlus size={20} />
                                    </button>
                                </div>
                                <p className="returnPolicy"><span className="span">Return policy:</span> 30 days return policy</p>
                                <div className="smButtons-container">
                                    <button type="button" className="buttons addCart" onClick={this.onClickAddCart}><BsCart3 size={14} /> ADD TO CART</button>
                                    <button type="button" className="buttons buyNow"> <MdElectricBolt size={14} /> BUY NOW</button>
                                </div>
                                <p className="productCategory"> <span className='span'>Category:</span> {category}</p>
                                <p className="productCategory"> <span className='span'>Brand:</span> {brand}</p>
                                <p className="productCategory"> <span className='span'>Color:</span> {color}</p>
                                <p className="productCategory"> <span className='span'>Model:</span> {model}</p>
                            </div>
                        </div>
                    )
                }}
            </AppContext.Consumer>
        )
    }

    renderProductsDetailsView = () => {
        const { apiStatus } = this.state

        switch (apiStatus) {
            case apiStatusConstant.success:
                return this.renderProductDetails();
            case apiStatusConstant.inProgress:
                return <LoaderView />;
            case apiStatusConstant.failure:
                return <FailureView />;

            default:
                return null;
        }
    }

    render() {
        return (
            <>
                <Header />
                <div className="productDetails-container">
                    {this.renderProductsDetailsView()}
                </div>
            </>
        )
    }
}

export default ProductDetails;