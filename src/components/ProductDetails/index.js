import { Component } from "react";
import { withRouter } from "react-router-dom";
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "../Header";
import LoaderView from "../LoaderView";
import FailureView from "../FailureView";
import Reviews from "../Reviews";
import AppContext from "../../Context/AppContext";
import "./index.css"

import { BsCart3 } from "react-icons/bs";
import { MdElectricBolt } from "react-icons/md";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

const apiStatusConstant = {
    success: "SUCCESS",
    inProgress: "INPROGRESS",
    failure: "FAILURE",
    initial: "INITIAL"
}

class ProductDetails extends Component {
    state = { productsDetailsData: [], quantity: 1, reviewsData: [], imagesList: [], apiStatus: apiStatusConstant.initial }

    componentDidMount() {
        this.getProductDetails()
    }

    getFormattedData = (data) => ({
        images: data.images[0],
        id: data.id,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        category: data.category,
        rating: data.rating,
        returnPolicy: data.returnPolicy,
        warrantyInformation: data.warrantyInformation,
        shippingInformation: data.shippingInformation,
        availabilityStatus: data.availabilityStatus,
    })

    getReviewsData = (data) => ({
        rating: data.rating,
        comment: data.comment,
        date: data.date,
        reviewerName: data.reviewerName
    })

    getCaurosalImagesData = (data) => ({
        images: data.images,
        id: data.id
    })


    getProductDetails = async () => {
        this.setState({ apiStatus: apiStatusConstant.inProgress })
        const { match } = this.props
        const { params } = match
        const { id } = params

        const apiUrl = `https://dummyjson.com/products/${id}`
        const options = {
            method: 'GET',
        }

        const productResponse = await fetch(apiUrl, options)

        if (productResponse.ok === true) {
            const fetchedData = await productResponse.json()
            const updatedData = this.getFormattedData(fetchedData)
            const updateReviewsData = fetchedData.reviews.map(
                eachReview => this.getReviewsData(eachReview)
            )
            const updatedCaurosalImages = fetchedData.images;
            this.setState({ productsDetailsData: updatedData, reviewsData: updateReviewsData, imagesList: updatedCaurosalImages, apiStatus: apiStatusConstant.success })
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

    renderProductImages = () => {
        var settings = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: true,
        };

        const { imagesList } = this.state

        return (
            <div className="images-container">
                <Slider {...settings}>
                    {imagesList.map(eachImage => (
                        <div key={eachImage.id}>
                            <img src={eachImage} alt="" className="slider-image" />
                        </div>
                    ))}
                </Slider>
            </div>
        )
    }



    renderProductDetails = () => {
        const { productsDetailsData, quantity, reviewsData, imagesList } = this.state
        const { title, images, price, description, brand, category, rating, returnPolicy, stock, warrantyInformation, shippingInformation, availabilityStatus } = productsDetailsData

        const productRating = String(rating).slice(0, 3);
        const stockAvailability = stock > 10 ? "" : "Only few Left";


            return (
                <AppContext.Consumer>
                    {value => {
                        const { isDarkTheme, addCartItem } = value

                        const homeTheme = isDarkTheme ? 'dark' : 'light'
                        const borderColor = isDarkTheme ? "borderDark" : "borderLight"

                        const onClickAddCart = () => {
                            addCartItem({ ...productsDetailsData, quantity })
                        }

                        const handleAddToCart = () => {
                            onClickAddCart();
                            toast.success(
                                <div className="addCardSuccess-conatiner">
                                    <img src={images} alt="" className="addCartImage" />
                                    <p>{title} added to cart!</p>
                                </div>, {
                                position: "bottom-right",
                                autoClose: 3000,
                            });
                        };

                        const handleBuyNow = () => {
                            onClickAddCart();
                            toast.success(
                                <div className="addCardSuccess-conatiner">
                                    <img src={images} alt="" className="addCartImage" />
                                    <p>{title} added to cart!</p>
                                </div>, {
                                position: "bottom-right",
                                autoClose: 2000,
                            });
                
                            const { history } = this.props;
                            history.push("/checkout");
                        };

                        return (
                            <div className={`productDetails ${homeTheme}`}>
                                <div className="image-buttons-container">
                                    {imagesList.length > 1 ? (
                                        this.renderProductImages()
                                    ) : (
                                        <img src={images} alt={title} className={`image ${borderColor}`} />
                                    )}
                                    <div className="buttons-container">
                                        <button type="button" className="buttons addCart" onClick={handleAddToCart} ><BsCart3 size={14} /> ADD TO CART</button>
                                        <button type="button" className="buttons buyNow" onClick={handleBuyNow}> <MdElectricBolt size={14} /> BUY NOW</button>
                                    </div>
                                </div>
                                <div className="productInformation-container">
                                    <h1 className="title">{title}</h1>
                                    <p className="productDescription">{description}</p>
                                    <p className="productCategory"> <span className='span'>Category:</span> {category}</p>
                                    <p className="productCategory"> <span className='span'>Brand:</span> {brand}</p>
                                    <div className="priceDetails-container">
                                        <p className="productDetailsPrice">₹{price} /- </p>
                                    </div>
                                    <div className="rating-review-container">
                                        <div className='productRating-container'>
                                            <p className='product-rating'>{productRating}</p>
                                            <img
                                                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                                                alt="star"
                                                className="star"
                                            />
                                        </div>
                                        <p className="review">111 Ratings & 3 Rewiews</p>
                                    </div>
                                    <div className="quantity-container">
                                        <button className="quantityButton" type="button" onClick={this.onClickDecreaseQuantity}>
                                            <CiCircleMinus size={20} className="icon" />
                                        </button>
                                        <p className="quantity">{quantity}</p>
                                        <button className="quantityButton" type="button" onClick={this.onClickIncreaseQuantity}>
                                            <CiCirclePlus size={20} />
                                        </button>
                                    </div>
                                    <p className="productStock">{stockAvailability}</p>
                                    <p className="returnPolicy"><span className="span">Return policy:</span> {returnPolicy}</p>
                                    <div className="smButtons-container">
                                        <button type="button" className="buttons addCart" onClick={handleAddToCart}><BsCart3 size={14} /> ADD TO CART</button>
                                            <button type="button" className="buttons buyNow" onClick={handleBuyNow}> <MdElectricBolt size={14} /> BUY NOW</button>
                                    </div>
                                    <hr className="break" />
                                    <div className="additionalInformation">
                                        <h1 className="informationHeading">Additional Information</h1>
                                        <p className="information"><span className="span">Warranty:</span> {warrantyInformation}</p>
                                        <p className="information"><span className="span">Shipping:</span> {shippingInformation}</p>
                                        <p className="information"><span className="span">Stock Availability:</span> {availabilityStatus}</p>
                                    </div>
                                    <hr className="break" />
                                    <div className="reviews-rating-container">
                                        <h1 className="informationHeading">Rating & Reviews</h1>
                                        <ul className="reviewsList-container">
                                            {reviewsData.map(eachProduct => (
                                                <Reviews
                                                    reviewDetails={eachProduct}
                                                    key={eachProduct.id}
                                                />
                                            ))}
                                        </ul>
                                    </div>
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
                        <ToastContainer />
                    </div>
                </>
            )
        }
    }

export default withRouter(ProductDetails);