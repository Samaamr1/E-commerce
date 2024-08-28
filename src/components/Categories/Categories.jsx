import axios from 'axios';
import React, { useEffect,useState } from 'react';


export default function Categories() {
    
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
    
       <div className="row"> {categories.map((category)=><div className='col-3 mt-3'>
        <img className='category-img w-100 mt-2' src={category.image} alt={category.name} />
        <p className='mt-2'>{category.name}</p>
      </div>)}
    </div>
     
     
    
  )
}
