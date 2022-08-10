import React from 'react'
import './card.css'
const Card = ({url,description,onClick}) => {
  return (
    <div>
      <div className="img-container">
      <img className='product-img' src={url} alt="" onClick={() =>onClick(url,description)}/>
      </div>
      
    </div>
  )
}

export default Card