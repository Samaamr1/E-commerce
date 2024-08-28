import axios from 'axios';
import '../../src/index.css'
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BeatLoader } from 'react-spinners';
import { useContext } from 'react';
import { CartContext } from './Context/CartContext';




export default function RecentProducts() {
  let {addProductToCart}=useContext(CartContext);

 async function addProduct (productId){
  let responce=await addProductToCart(productId);
  console.log(responce);
  
}



function getRecent(){
  return axios.get(` https://ecommerce.routemisr.com/api/v1/products` )

}
 let{data, isError,error,isLoading} =useQuery({queryKey:['recentproducts']
  , queryFn:getRecent,
  //refetchInterval:3000,
  staleTime:8000,
})
if (isLoading) {
  return <div className=' py-5 w-100 d-flex justify-content-center '>
  <BeatLoader color='green'/>
  </div>
 
}
if (isError) {
  return <div className=' py-5 w-100 d-flex justify-content-center '>
 <h3>{error}</h3>
  </div>
 
}


  return (
    <div className='row d-flex flex-wrap px-4 py-8 align-items-center'>
      {data?.data.data.map((product) => (
        <div key={product.id} className='col-2 px-4'>
          <div className='product py-4'>
            <Link to={`/ProductDetailes/${product.id}`} className='no-underline'>
            <img className='w-100' src={product.imageCover} alt={product.title} />
            <span className='block fw-light text-success'>{product.category.name}</span>
            <h5 className='fw-normal mb-4'>{product.title.split(' ').slice(0, 2).join(' ')}</h5>
            <div className='d-flex justify-content-between align-items-center'>
            <p>{product.price} EGP</p>
            <p >{product.ratingsAverage} <i className="fa-solid fa-star text-warning"></i></p>

            </div>
            
            </Link>
            <button onClick={()=>addProduct(product.id)} className='btn px-4 py-2 w-100 rounded-3 text-white bg-success'>
Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
