import React from 'react'
import { Link } from 'react-router-dom'
import "./index.css"

const ProductCategoryItem = (props) => {
  const { productCategoryData } = props
  const { name,slug} = productCategoryData

  return (
    <Link to={`/products/category/${slug}`} className='categoryItem'>
      <li className='categoryItem'>
        <p className='categoryName'>{name}</p>
      </li>
    </Link>
  )
}

export default ProductCategoryItem
