import React, { Component } from 'react';
import Header from '../Header'
import ProductItem from '../ProductItem'
import LoaderView from '../LoaderView';
import FailureView from '../FailureView';
import HomeBanner from '../HomeBanner';
import Filters from '../Filters';
import AppContext from '../../Context/AppContext';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

import './index.css';

const apiStatusConstant = {
    success: "SUCCESS",
    inProgress: "INPROGRESS",
    failure: "FAILURE",
    initial: "INITIAL"
}

class Home extends Component {
    state = { productsData: [], searchInput: '', currentPage: 0, apiStatus: apiStatusConstant.initial }

    componentDidMount() {
        this.getProducts()
    }

    getProducts = async () => {
        this.setState({ apiStatus: apiStatusConstant.inProgress })
        const { searchInput, currentPage } = this.state
        let apiUrl;

        if (searchInput === "") {
            apiUrl = `https://dummyjson.com/products?limit=20&skip=${currentPage * 20}`
        } else {
            apiUrl = `https://dummyjson.com/products/search?q=${searchInput}&limit=0`
        }
        const options = {
            method: 'GET',
        }

        const response = await fetch(apiUrl, options);

        if (response.ok === true) {
            const data = await response.json();
            const fetchedProducts = data.products.map(each => ({
                id: each.id,
                title: each.title,
                price: each.price,
                thumbnail: each.thumbnail,
                rating: each.rating,
                stock: each.stock
            }))
            this.setState({ productsData: fetchedProducts, apiStatus: apiStatusConstant.success })
        } else {
            this.setState({ apiStatus: apiStatusConstant.failure })
        }
    }

    renderProducts = () => {
        const { productsData } = this.state
        const shouldShowProductsList = productsData.length > 0

        return shouldShowProductsList ? (

            <ul className='products-container'>
                {productsData.map(eachProduct => (
                    <ProductItem key={eachProduct.id} productItemData={eachProduct} />
                ))}
            </ul>
        ) : (
            <div className="no-products-view">
                <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
                    className="no-products-img"
                    alt="no products"
                />
                <h1 className="no-products-heading">No Products Found</h1>
                <p className="no-products-description">
                    We could not find any products.
                </p>
            </div>
        )
    }

    changeSearchInput = searchInput => {
        this.setState({ searchInput });
      }

      enterSearchInput = () => {
        this.getProducts(); 
      }
    renderProductsView = () => {
        const { apiStatus } = this.state

        switch (apiStatus) {
            case apiStatusConstant.success:
                return this.renderProducts();
            case apiStatusConstant.inProgress:
                return <LoaderView />;
            case apiStatusConstant.failure:
                return <FailureView />;

            default:
                return null;
        }
    }

    onClickRightArrow = () => {
        const { currentPage } = this.state

        if (currentPage < 9) {
            this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }), this.getProducts)
        }
    }

    onClickLeftArrow = () => {
        const { currentPage } = this.state

        if (currentPage > 0) {
            this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }), this.getProducts)
        }
    }



    render() {
        const { searchInput, currentPage, productsData } = this.state
        return (
            <AppContext.Consumer>
                {value => {
                    const { isDarkTheme } = value

                    const homeTheme = isDarkTheme ? 'dark' : 'light'

                    return (
                        <div>
                            <Header searchInput={searchInput} changeSearchInput={this.changeSearchInput} enterSearchInput={this.enterSearchInput} />
                            <HomeBanner />
                            <Filters />
                            <div className={`home-container ${homeTheme}`}>
                                {this.renderProductsView()}
                                {productsData.length > 13 ? (
                                    <div className="restaurantNavigation">
                                        <button className="angleIcon" type="button" onClick={this.onClickLeftArrow}>
                                            <MdKeyboardArrowLeft size={20} />
                                        </button>
                                        <p className="pageNum">{currentPage + 1} of 10</p>
                                        <button className="angleIcon" type="button" onClick={this.onClickRightArrow}>
                                            <MdKeyboardArrowRight size={20} />
                                        </button>
                                    </div>

                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

export default Home