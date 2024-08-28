import React from 'react'
import mainslider from '../../src/assets/images/slider-image-3.jpeg'
import mainslider1 from '../../src/assets/images/slider-2.jpeg'
import mainslider2 from '../../src/assets/images/grocery-banner-2.jpeg'
import slide1 from '../../src/assets/images/slider-image-1.jpeg'
import slide2 from '../../src/assets/images/slider-image-2.jpeg'
import Slider from "react-slick";
export default function MainSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow:1,
        slidesToScroll: 1,
        autoplay:true,
        
      };
  return (
    <div>
        <div className="row d-flex flex-wrap px-4 py-8 m-5 ">
      <div className="col-md-9">
      <Slider {...settings}>
      <img  src={mainslider} className='w-100 h400' />
      <img  src={mainslider1} className='w-100 h400' />
      <img  src={mainslider2} className='w-100 h400' />
      
    </Slider>

      </div>
      <div className="col-md-3">
      <img src={slide1} className='w-100 h200' />
      <img src={slide2} className='w-100 h200' />
      </div>
    </div>
    </div>
  )
}
