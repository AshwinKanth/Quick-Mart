import { MagnifyingGlass } from "react-loader-spinner"
import "./index.css"


const LoaderView = () => (
    <div className="loading-container">
        <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="magnifying-glass-loading"
            wrapperStyle={{}}
            wrapperClass="magnifying-glass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
        />
    </div>
)

export default LoaderView;