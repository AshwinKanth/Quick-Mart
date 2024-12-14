import { BsFilterRight } from 'react-icons/bs'
import Select from 'react-select';
import './index.css'
import AppContext from '../../Context/AppContext'

const priceRangeOptions = [
    { value: { min: 200, max: 499 }, label: '₹200 - ₹499' },
    { value: { min: 500, max: 999 }, label: '₹500 - ₹999' },
    { value: { min: 1000, max: 1999 }, label: '₹1000 - ₹1999' },
    { value: { min: 2000, max: 5000 }, label: '₹2000 - ₹5000' },
];

const PriceFilter = (props) => {

    const { sortbyOptions, activeOptionId, onChangePriceRange } = props


    const handleChange = (selectedOption) => {
        onChangePriceRange(selectedOption?.value || null);
    };

    const onChangeSortby = event => {
        const { changeSortby } = props
        changeSortby(event.target.value)
    }

    return (
        <AppContext.Consumer>
            {value => {
                const { isDarkTheme } = value
                const homeTheme = isDarkTheme ? 'dark' : 'light'

                return (
                    <div className={`products-header ${homeTheme}`}>
                        <h1 className="products-list-heading">All Products</h1>
                        <div className='priceFilter-container'>
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

                            <div className="price-range-filter">
                                <Select
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            border: state.isFocused ? 'none' : 'none',
                                            borderRadius: '30px',
                                            borderColor: state.isFocused ? '#007bff' : '#ccc',
                                            boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0, 123, 255, 0.25)' : null,
                                            backgroundColor: state.isFocused ? null : null,
                                        }),
                                    }}
                                    options={priceRangeOptions}
                                    onChange={handleChange}
                                    placeholder="Select Price Range"
                                    isClearable
                                    className='sort-by-select'
                                />
                            </div>
                        </div>
                    </div>
                )
            }}
        </AppContext.Consumer>

    )
}

export default PriceFilter