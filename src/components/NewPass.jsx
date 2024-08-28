import React, { useContext, useState } from 'react';
import '../App.css'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './Context/UserContext';

// Validation schema for the new password form
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  newPassword: Yup.string().required('New password is required'),
});

function NewPass() {
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle new password submission
  function handleNewPass(formValues) {
    setIsLoading(true); // Start loading
    setApiError(''); // Clear any previous error

    axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', formValues)
      .then(({ data }) => {
        console.log(data);
        if (data.token) {
          navigate('/Login'); // Navigate to the login page
        } else {
          setApiError('Password reset failed.'); // Handle failure response
        }
      })
      .catch(error => {
        setApiError(error?.response?.data?.message || 'An error occurred'); // Set error message
      })
      .finally(() => {
        setIsLoading(false); // Stop loading
      });
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleNewPass,
  });

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="w-50">
        {apiError && (
          <div className="alert alert-danger text-center" role="alert">
            {apiError}
          </div>
        )}
        <h2 className="text-center mb-4 sub-tit">Reset Password</h2>
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
              value={formik.values.newPassword}
              type="password"
              className="form-control"
              id="floatingNewPassword"
              name="newPassword"
              placeholder="New Password"
            />
            <label htmlFor="floatingNewPassword">New Password</label>
            {formik.errors.newPassword && formik.touched.newPassword && (
              <div className="text-danger">{formik.errors.newPassword}</div>
            )}
          </div>

          <button type="submit" className="btn btn-success mb-2">
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              'Submit'
            )}
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default NewPass;
