import AppContext from "../../Context/AppContext";
import { Link } from 'react-router-dom'
import "./index.css"

const FailureView = (props) => {


    return (
        <AppContext.Consumer>
            {value => {
                const { isDarkTheme } = value
                const homeTheme = isDarkTheme ? 'dark' : 'light'

                return (
                    <div className={`no-products-container ${homeTheme}`}>
                        <img
                            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                            alt="failure view"
                            className="no-products-image"
                        />
                        <h1 className="failureHeading">Oops! Something Went Wrong</h1>
                        <Link to="/">
                            <button type="button" className="failureButton">
                                Retry
                            </button>
                        </Link>
                    </div>
                )
            }}
        </AppContext.Consumer>

    )
}


export default FailureView;