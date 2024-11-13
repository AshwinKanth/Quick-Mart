import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import AppContext from "../../Context/AppContext";
import './index.css'

const HomeBanner = () => {

    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true
    }


    return (
        <AppContext.Consumer>
            {value => {
                const { isDarkTheme } = value
                const homeTheme = isDarkTheme ? 'dark' : 'light'
        return(
            <div className={`slider-container ${homeTheme}`}>
                <Slider {...settings}>
                    <div>
                        <img src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1720421655/de34ef653485a15f_ahtgvt.webp" className="carouselImage" alt="" />
                    </div>
                    <div>
                        <img src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1720421702/09f87ed8620d737a_kswb10.webp" className="carouselImage" alt="" />
                    </div>
                    <div>
                        <img src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1719561805/37ecb61b2e6e4020_iyzbre.webp" className="carouselImage" alt="" />
                    </div>
                    <div>
                        <img src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1720421749/7d8ae7b10c65dc4a_c2eajx.webp" className="carouselImage" alt="" />
                    </div>
                    <div>
                        <img src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1720421839/a5a3b24721862956_wjgej5.webp" className="carouselImage" alt="" />
                    </div>
                    <div>
                        <img src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1719561929/d195709d244df74e_c5ve85.webp" className="carouselImage" alt="" />
                    </div>
                    <div>
                        <img src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1720421907/680ee4a04730ee20_v8wfhr.webp" className="carouselImage" alt="" />
                    </div>
                </Slider>
            </div>
        )}}

        </AppContext.Consumer>

    );
}

export default HomeBanner

