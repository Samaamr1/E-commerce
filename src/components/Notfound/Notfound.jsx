import React from 'react'
import error from '../../assets/images/error.svg'
function Notfound() {
    return (
        <div className='text-center my-4'>
        <h2>Not Found</h2>
        <img className='m-auto' src={error} alt="" />
      </div>
    )
    
}

export default Notfound
