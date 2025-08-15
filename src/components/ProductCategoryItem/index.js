import { Link } from 'react-router-dom'
import "./index.css"

const ProductCategoryItem = ({ productCategoryData }) => {
  const { name, slug } = productCategoryData

  const imageFileName = name + '.jpg'

  const imageSrc = `/assets/${imageFileName}`

  return (
    <Link to={`/products/category/${slug}`} className='categoryItem'>
      <li className='categoryItem'>
        <img
          src={imageSrc}
          alt={name}
          className='categoryImage'
        />
        <p className='categoryName'>{name}</p>
      </li>
    </Link>
  )
}

export default ProductCategoryItem
