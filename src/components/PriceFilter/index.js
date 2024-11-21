import { BsFilterRight } from 'react-icons/bs'

import './index.css'
import AppContext from '../../Context/AppContext'

const ProductsHeader = props => {
    const onChangeSortby = event => {
        const { changeSortby } = props
        changeSortby(event.target.value)
    }

    const { sortbyOptions, activeOptionId } = props

    return (
        <AppContext.Consumer>
            {value => {
                const { isDarkTheme } = value
                const homeTheme = isDarkTheme ? 'dark' : 'light'

                return (
                    <div className={`products-header ${homeTheme}`}>
                        <h1 className="products-list-heading">All Products</h1>
                        <div className="sort-by-container">
                            <BsFilterRight className="sort-by-icon" />
                            <select
                                className="sort-by-select"
                                value={activeOptionId}
                                onChange={onChangeSortby}
                            >
                                {sortbyOptions.map(eachOption => (
                                    <option
                                        key={eachOption.optionId}
                                        value={eachOption.optionId}
                                        className="select-option"
                                    >
                                        {eachOption.displayText}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )
            }}
        </AppContext.Consumer>

    )
}

export default ProductsHeader