import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { BiLike } from "react-icons/bi";
import { AiOutlineDislike } from "react-icons/ai";
import "./index.css"
import AppContext from '../../Context/AppContext';

const Reviews = (props) => {
    const { reviewDetails } = props
    const { rating, comment, date, reviewerName } = reviewDetails

    return (
        <AppContext.Consumer>
            {value => {
                const { isDarkTheme } = value
                const borderOutineColor = isDarkTheme ? "borderDark" : "borderLight"

                return (
                    <div className={`reviewsContainer ${borderOutineColor}`}>
                        <div className='rating-comment-container'>
                            <div className='revieweRating-container'>
                                <p className='product-rating'>{rating}</p>
                                <img
                                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                                    alt="star"
                                    className="star"
                                />
                            </div>
                            <p className='comment'>{comment}</p>
                        </div>
                        <div className='details-like-container'>
                            <div className='reviewerDetails'>
                                <p className='reviewerName'>{reviewerName}</p>
                                <p className='date'>{formatDistanceToNow(new Date(date))}</p>
                            </div>
                            <div className='likeDislike-container'>
                                <p className='likeIcon'><BiLike /> 0</p>
                                <p className='dislikeIcon'><AiOutlineDislike /> 0</p>
                            </div>
                        </div>
                    </div>
                )
            }}
        </AppContext.Consumer>

    )
}

export default Reviews