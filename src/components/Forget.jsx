import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from './Context/UserContext';

// Validation schema for the Forget form
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

function Forget() {
  const { setUserForget } = useContext(UserContext); // Ensure setUserForget is actually used or remove it
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle forget password submission
  async function handleForget(formValues) {
    setIsLoading(true); // Start loading
    setApiError(''); // Clear any previous error
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', formValues);
      if (data.statusMsg === 'success') {
        navigate('/reset'); // Correct path to navigate on success
      } else {
        setApiError('Failed to reset password.'); // Handle failure response
      }
    } catch (error) {
      setApiError(error?.response?.data?.message || 'An error occurred'); // Set error message
    } finally {
      setIsLoading(false); // Stop loading
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleForget,
  });

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="w-50">
        {apiError && (
          <div className="alert alert-danger text-center" role="alert">
            {apiError}
          </div>
        )}
        <h2 className="text-center mb-4 sub-tit">Forget Password!</h2>
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

          <button type="submit" className="btn btn-success mb-2">
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              'Submit'
            )}
          </button>
          <p>Don't have an account yet? <span className='fw-semibold text-success'><Link className='text-success' to={'/Register'}>Register Now</Link></span></p>
          <p>Already have an account? <span className='fw-semibold'><Link className='text-success' to={'/Login'}>Login</Link></span></p>
        </form>
      </div>
    </div>
  );
}

export default Forget;
