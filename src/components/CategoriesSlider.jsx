import axios from 'axios';
import React, { useEffect,useState } from 'react';
import Slider from "react-slick";

export default function CategoriesSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow:8,
        slidesToScroll: 3,
        autoplay:true,
      };
      const [categories, setCategories] = useState([]);
      function getCtegories() {
         axios.get('https://ecommerce.routemisr.com/api/v1/categories')
          .then(({ data }) => {
            setCategories(data.data);
            setLoading(false);
          })
          .catch((error) => {
            
          });
      }
useEffect(()=>{
    getCtegories();
}
)


  return (
    <div>
        <h5 className='p-5 text-success'>Shop popular categories</h5>
      <Slider {...settings}>
      {categories.map((category)=><div>
        <img className='category-img w-100 mt-2' src={category.image} alt={category.name} />
        <p className='mt-2'>{category.name}</p>
      </div>)}
    </Slider>
    </div>
  )
}
