import "./index.css"

const FailureView = (props) => {


    return (
        <div className="no-products-container">
            <img
                src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                alt="failure view"
                className="no-products-image"
            />
            <h1 className="failureHeading">Oops! Something Went Wrong</h1>
            <button type="button" className="failureButton">
                Retry
            </button>
        </div>
    )
}


export default FailureView;