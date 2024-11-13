import React, { Component } from 'react';
import Header from '../Header'
import ProductItem from '../ProductItem'
import LoaderView from '../LoaderView';
import FailureView from '../FailureView';
import AppContext from '../../Context/AppContext';

import './index.css';

const apiStatusConstant = {
    success: "SUCCESS",
    inProgress: "INPROGRESS",
    failure: "FAILURE",
    initial: "INITIAL"
}

class Home extends Component {
    state = { productsData: [], apiStatus: apiStatusConstant.initial }

    componentDidMount() {
        this.getProducts()
    }

    getProducts = async () => {
        this.setState({ apiStatus: apiStatusConstant.inProgress })
        const apiUrl = 'https://fakestoreapi.in/api/products?limit=150'
        const options = {
            method: 'GET',
        }

        const response = await fetch(apiUrl, options);

        if (response.ok === true) {
            const data = await response.json();
            const fetchedProducts = data.products.map(each => ({
                title: each.title,
                price: each.price,
                image: each.image
            }))
            this.setState({ productsData: fetchedProducts, apiStatus: apiStatusConstant.success })
        } else {
            this.setState({ apiStatus: apiStatusConstant.failure })
        }
    }

    renderProducts = () => {
        const { productsData } = this.state

        return (
            <ul className='products-container'>
                {productsData.map(eachProduct => (
                    <ProductItem key={eachProduct.id} productItemData={eachProduct} />
                ))}
            </ul>
        )
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

    render() {
        return (
            <AppContext.Consumer>
                {value => {
                    const { isDarkTheme } = value

                    const homeTheme = isDarkTheme ? 'dark' : 'light'

                    return (
                        <div>
                            <Header />
                            <div className={`home-container ${homeTheme}`}>
                                {this.renderProductsView()}
                            </div>
                        </div>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

export default Home