import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { BeatLoader } from 'react-spinners';

function Brands() {
  // Function to fetch brands
  const getBrands = async () => {
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      return response.data; // Return the data object directly
    } catch (error) {
      throw new Error('Failed to fetch brands'); // Throw error to be caught by react-query
    }
  };

  // Use react-query to fetch data
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
  });

  // Show loader while fetching
  if (isLoading) {
    return (
      <div className='py-5 w-100 d-flex justify-content-center align-content-center'>
        <BeatLoader color='green' />
      </div>
    );
  }

  // Show error message if fetching fails
  if (isError) {
    return (
      <div className='py-5 w-100 d-flex justify-content-center'>
        <h3>Error: {error.message}</h3>
      </div>
    );
  }

  // Render the brands
  return (
    <div className='row d-flex flex-wrap px-4 py-8 align-items-center'>
      {data?.data?.map((brand) => (
        <div key={brand.id} className='col-3 px-4 my-3'>
         
          <div className='brand-card p-3 border rounded shadow'>
            <img src={brand.image} alt={brand.name} className='img-fluid ' />
            <h5 className='mt-2 text-center'>{brand.name}</h5>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Brands;
