import { Component } from "react";
import LoaderView from "../LoaderView";
import FailureView from "../FailureView";
import Header from "../Header";
import ProductItem from "../ProductItem";
import PriceFilter from "../PriceFilter";

import "./index.css"
import AppContext from "../../Context/AppContext";

const sortbyOptions = [
    {
        optionId: 'desc',
        displayText: 'Price (High-Low)',
    },
    {
        optionId: 'asc',
        displayText: 'Price (Low-High)',
    },
]

const apiStatusConstant = {
    success: "SUCCESS",
    inProgress: "INPROGRESS",
    failure: "FAILURE",
    initial: "INITIAL"
}


class ProductCategory extends Component {
    state = { productCategoryItemsList: [], activeOptionId: sortbyOptions[0].optionId, apiStatus: apiStatusConstant.initial }

    componentDidMount() {
        this.getCategoryItems()
    }

    getCategoryItems = async () => {
        this.setState({ apiStatus: apiStatusConstant.inProgress })
        const { match } = this.props
        const { params } = match
        const { slug } = params

        console.log(match)

        const { activeOptionId } = this.state

        const apiUrl = `https://dummyjson.com/products/category/${slug}?sortBy=price&order=${activeOptionId}`
        const options = {
            method: "GET"
        }

        const categoryItemsResponse = await fetch(apiUrl, options)

        if (categoryItemsResponse.ok === true) {
            const fetchedData = await categoryItemsResponse.json()

            const updatedData = fetchedData.products.map(eachItem => ({
                id: eachItem.id,
                title: eachItem.title,
                category: eachItem.category,
                price: eachItem.price,
                rating: eachItem.rating,
                thumbnail: eachItem.thumbnail,
                discountPercentage: eachItem.discountPercentage,
                stock: eachItem.stock
            }))
            this.setState({ productCategoryItemsList: updatedData, apiStatus: apiStatusConstant.success })
        } else {
            this.setState({ apiStatus: apiStatusConstant.failure })
        }
    }

    changeSortby = activeOptionId => {
        this.setState({ activeOptionId }, this.getCategoryItems)
    }



    renderCategoryItems = () => {
        const { productCategoryItemsList } = this.state

        return (
            <ul className="categoryItems-container">
                {productCategoryItemsList.map(eachItem => (
                    <ProductItem key={eachItem.id} productItemData={eachItem} />
                ))}
            </ul>
        )
    }



    renderCategoryItemsView = () => {
        const { apiStatus } = this.state

        switch (apiStatus) {
            case apiStatusConstant.success:
                return this.renderCategoryItems();
            case apiStatusConstant.inProgress:
                return <LoaderView />;
            case apiStatusConstant.failure:
                return <FailureView />;
            default:
                return null;
        }
    }

    render() {
        const { activeOptionId } = this.state
        return (
            <AppContext.Consumer>
                {value => {
                    const { isDarkTheme } = value
                    const homeTheme = isDarkTheme? 'dark' : 'light'

                    return (
                        <>
                            <Header />
                            <div className={`productCategory-container ${homeTheme}`}>
                                <PriceFilter
                                    activeOptionId={activeOptionId}
                                    sortbyOptions={sortbyOptions}
                                    changeSortby={this.changeSortby}
                                />
                                {this.renderCategoryItemsView()}
                            </div>
                        </>
                    )
                }}
            </AppContext.Consumer>

        )
    }
}


export default ProductCategory