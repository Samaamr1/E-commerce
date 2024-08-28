import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { getLoggedUserCart, updateCertItemCount, deleteItemFromCart } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);

  async function getCartItems() {
    try {
      const response = await getLoggedUserCart();
      console.log('Cart data:', response.data.data); // Debugging
      setCartDetails(response.data.data);
    } catch (error) {
      console.error('Failed to fetch cart items', error);
    }
  }

  async function handleQuantityChange(productId, event) {
    const newCount = parseInt(event.target.value, 10);
    try {
      const response = await updateCertItemCount(productId, newCount);
      console.log('Updated cart data:', response.data.data); // Debugging
      setCartDetails(response.data.data);
    } catch (error) {
      console.error('Failed to update item count', error);
    }
  }

  async function handleRemoveItem(productId) {
    try {
      await deleteItemFromCart(productId);
      // Refresh cart after removing item
      getCartItems();
    } catch (error) {
      console.error('Failed to remove item', error);
    }
  }

  useEffect(() => {
    getCartItems();
  }, []); // Empty dependency array to run only on mount

  return (
    <div className="container py-4">
      <h2 className="mb-4">Shopping Cart</h2>
      <table className="table table-striped cart-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product</th>
            <th scope="col">Image</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartDetails?.products.map((product, index) => (
            <tr key={product.product.id}>
              <th scope="row">{index + 1}</th>
              <td className='fw-bold'>{product.product.title}</td>
              <td>
                <img src={product.product.imageCover} alt={product.product.title} className='h200' />
              </td>
              <td><span className='text-success'>{product.price} EGP</span></td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={product.count}
                  min="1"
                  max="50"
                  onChange={(event) => handleQuantityChange(product.product.id, event)}
                />
              </td>
              <td><span className='text-success'>{product.price * product.count} EGP</span></td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveItem(product.product.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="total-row">
            <td colSpan="5" className="text-right text-danger fw-bolder">Total</td>
            <td>{cartDetails?.totalCartPrice} EGP</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      
        <Link to={`/checkout`}>
          <button className="btn btn-success ">Checkout</button>
        </Link>
      
    </div>
  );
}

export default Cart;
