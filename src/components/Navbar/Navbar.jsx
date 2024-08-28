import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';



function Navbar() {
  const [logo, setLogo] = useState('');

  useEffect(() => {
    import('../../assets/images/freshcart-logo.svg')
      .then((module) => setLogo(module.default))
      .catch((error) => console.error('Error loading logo:', error));
  }, []);
 
   let {userLogin,setuserLogin}=useContext(UserContext);
   let navigate =useNavigate();
function logOut() {
  localStorage.removeItem('userToken');
  setuserLogin(null);
  navigate('/Login');
}





  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed left-0 top-0 right-0 py-2">
      <div className="container">
        <NavLink className="navbar-brand text-center" to="/">
          <img 
            src={logo} 
            alt="Freshcart Logo" 
            width="150" 
            height="auto" 
            className="d-inline-block align-text-top text-center" 
          />
        </NavLink>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center">
          {userLogin !==null?<>
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">Cart</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/wishlist">Wishlist</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/categories">Categories</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/brands">Brands</NavLink>
            </li>
          </>:null
          }
            
          </ul>
          <div className="d-flex align-items-center text-center">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {userLogin==null?<>
              <li className="nav-item">
              <NavLink className="nav-link" to="/Login">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">Register</NavLink>
            </li>
            </>:<li onClick={logOut} className="nav-item cursor-pointer">
              <span className="nav-link">Logout</span>
            </li>}
          
            
            <li className=' d-flex align-items-center'>
            <i className="fa-brands mx-2 fa-facebook"></i>
            <i className="fa-brands mx-2 fa-instagram"></i>
            <i className="fa-brands mx-2 fa-tiktok"></i>
            <i className="fa-brands mx-2 fa-twitter"></i>
            <i className="fa-brands mx-2 fa-linkedin"></i>
            <i className="fa-brands mx-2 fa-youtube"></i>
            </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
