import React, { useContext, useState} from 'react';
import '../../App.css'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';
import { UserContext } from '../Context/UserContext';





// Validation schema for the login form
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

function Login() {
  let {setuserLogin}=useContext(UserContext)
  const [loginImage, setLoginImage] = useState('');
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();


  // Handle registration
  function handleLogin(formValues) {
    setIsLoading(true); // Start loading

    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formValues)
        .then(response => {
            if (response.data.message === 'success') {
                localStorage.setItem('userToken', response.data.token); 
                setuserLogin(response.data.token);
                navigate('/'); 
            }
            setIsLoading(false); // Stop loading
        })
        .catch(error => {
            setIsLoading(false); // Stop loading
            setApiError(error?.response?.data?.message || 'An error occurred'); // Set error message
        });
}

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      

      <div className="w-50">
        {apiError && (
          <div className="alert alert-danger text-center" role="alert">
            {apiError}
          </div>
        )}
        <h2 className="text-center mb-4 sub-tit">Log in!</h2>
        <form onSubmit={formik.handleSubmit}>
          
          <div className="form-floating mb-3 custom-form-floating">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              className="form-control"
              id="floatingEmail"
              name="email"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingEmail">Email address</label>
            {formik.errors.email && formik.touched.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}
          </div>

          
          <div className="form-floating mb-3 custom-form-floating">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              className="form-control"
              id="floatingPassword"
              name="password"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
            {formik.errors.password && formik.touched.password && (
              <div className="text-danger">{formik.errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-success mb-2 ">
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              'Login'
            )}
          </button>
          <p>Didn't have account yet? <span  className='fw-semibold text-success'><Link className='text-success' to={'/Register'}>Register Now</Link></span></p>
          <p>Forget password? <span  className='fw-semibold'><Link className='text-success' to={'/Forget'}>Forget password </Link></span></p>
        </form>
        
      </div>
      
    </div>
  );
}

export default Login;
