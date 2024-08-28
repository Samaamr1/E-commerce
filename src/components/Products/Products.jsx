import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';

function Products() {
  // Define the function to fetch recent products
  function getRecent() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  // Use `useQuery` to fetch the products data
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['recentproducts'],
    queryFn: getRecent,
    staleTime: 8000, // Time for which the data is considered fresh
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className='py-5 w-100 d-flex justify-content-center'>
        <ClimbingBoxLoader color='green' />
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className='py-5 w-100 d-flex justify-content-center'>
        <h3>{error.message || 'An error occurred'}</h3>
      </div>
    );
  }

  // Render products list
  return (
    <div className='row d-flex flex-wrap px-4 py-8 mb-3 align-items-center'>
      {data?.data.data.map((product) => (
        <div key={product.id} className='col-2 px-4 mb-4'>
          <div className='product py-4'>
            <Link to={`/ProductDetailes/${product.id}`} className='text-decoration-none'>
              <img className='w-100' src={product.imageCover} alt={product.title} />
              <span className='d-block fw-light text-success'>{product.category.name}</span>
              <h5 className='fw-normal mb-4 text-black'>{product.title.split(' ').slice(0, 2).join(' ')}</h5>
              <div className='d-flex justify-content-between align-items-center text-black'>
                <p>{product.price} EGP</p>
                <p>
                  {product.ratingsAverage} <i className="fa-solid fa-star text-warning"></i>
                </p>
              </div>
              <button className='btn px-4 py-2 w-100 rounded-3 text-white bg-success'>
                Add to cart
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
