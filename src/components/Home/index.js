import React, { Component } from 'react';
import Header from '../Header'
import ProductItem from '../ProductItem'
import AppContext from '../../Context/AppContext';

import './index.css';

class Home extends Component {
    state = { productsData: [] }

    componentDidMount() {
        this.getProducts()
    }

    getProducts = async () => {
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
            console.log(data)
            this.setState({ productsData: fetchedProducts })
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
                                {this.renderProducts()}
                            </div>
                        </div>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

export default Home