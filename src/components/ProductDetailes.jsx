import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";

export default function ProductDetailes() {
  let { id} = useParams(); 
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };



  const [productDetailes, setProductDetailes] = useState(null);
  
  function getProductsDetails(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then(({ data }) => {
      setProductDetailes(data.data);
     
    })
      .catch(() => { 
      });
  }
  console.log(id);
  

 
  useEffect(() => {
      getProductsDetails(id);
     
  }); 
  return (
    <div className='container py-4' >
      <div className='row py-5'>
        <div className='col-md-3'>
          
          <Slider {...settings}>
      {productDetailes?.images.map((src)=><img 
            className='w-100' 
            src={src} 
            alt={productDetailes?.title } 
          />)}
    </Slider>
        </div>
        <div className='col-md-9 p-6'>
          <h1>{productDetailes?.title}</h1>
          <p className=' fw-light'>{productDetailes?.description }</p>
          <p>Price: {productDetailes?.price } EGP</p>
          <p>Ratings: {productDetailes?.ratingsAverage} <i className="fa-solid fa-star text-warning"></i></p>
          <button className='btn bg-success text-white my-4 w-50'>Add to cart</button>
        </div>
      </div>
    </div>
  );
}
