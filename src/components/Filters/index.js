import { Component } from "react"
import ProductCategoryItem from "../ProductCategoryItem"
import AppContext from "../../Context/AppContext"
import './index.css'

class Filters extends Component {
    state = { productCategoryList: [] }

    componentDidMount() {
        this.getProductCategory()
    }

    getProductCategory = async () => {
        const url = "https://dummyjson.com/products/categories"
        const options = {
            method: "GET"
        }

        const categoryResponse = await fetch(url, options)

        if (categoryResponse.ok === true) {
            const categoryData = await categoryResponse.json()

            const updateCategoryData = categoryData.map(eachCategory => ({
                id: eachCategory.id,
                name: eachCategory.name,
                slug: eachCategory.slug
            }))
            this.setState({ productCategoryList: updateCategoryData })
        }
    }


    render() {
        const { productCategoryList } = this.state
        return (
            <AppContext.Consumer>
                {value => {
                    const { isDarkTheme } = value

                    const homeTheme = isDarkTheme? 'dark' : 'light'

                    return (
                        <div className={`filters-container ${homeTheme}`}>
                            <ul className="productCategoryList">
                                {productCategoryList.map(eachCategory => (
                                    <ProductCategoryItem key={eachCategory.id} productCategoryData={eachCategory} />
                                ))}
                            </ul>
                        </div>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

export default Filters