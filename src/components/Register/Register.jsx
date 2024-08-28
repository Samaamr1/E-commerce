import React, { useContext, useState } from 'react'; 
import '../../App.css'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

// Validation schema
const validationSchema = Yup.object({
    name: Yup.string().min(2, 'It is too short!').max(10, 'Name is too long').required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password must start with an uppercase letter').required('Password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
    phone: Yup.string().matches(/^(002)?01[0-25][0-9]{8}$/, 'Invalid phone number').required('Phone number is required')
});

function Register() {
  let {setuserLogin} =useContext(UserContext)
    const navigate = useNavigate();
    const [apiError, setApiError] = useState(''); // State for API errors
    const [isLoading, setIsLoading] = useState(false); // State for loading spinner

    function handleRegister(formValues) {
        setIsLoading(true); // Start loading

        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formValues)
            .then(response => {
                if (response.data.message === 'success') {
                    localStorage.setItem('userToken', response.data.token); 
                    setuserLogin(response.data.token);
                    navigate('/Login'); // Navigate to the home page on success
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
            name: '',
            phone: '',
            email: '',
            password: '',
            rePassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: handleRegister
    });

    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="w-50">
                {apiError && (
                    <div className="alert alert-danger text-center" role="alert">
                        {apiError}
                    </div>
                )}
                <h2 className="text-center mb-4 sub-tit">Sign Up!</h2>
                <form onSubmit={formik.handleSubmit}>
                    {/* Floating Name Input */}
                    <div className="form-floating mb-3 custom-form-floating">
                        <input
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            type="text"
                            className="form-control"
                            id="floatingName"
                            name="name"
                            placeholder="John Doe"
                        />
                        <label htmlFor="floatingName">Name</label>
                        {formik.errors.name && formik.touched.name && (
                            <div className="text-danger">{formik.errors.name}</div>
                        )}
                    </div>

                    {/* Floating Email Input */}
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

                    {/* Floating Phone Input */}
                    <div className="form-floating mb-3 custom-form-floating">
                        <input
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            type="tel"
                            className="form-control"
                            id="floatingPhone"
                            name="phone"
                            placeholder="123-456-7890"
                        />
                        <label htmlFor="floatingPhone">Phone</label>
                        {formik.errors.phone && formik.touched.phone && (
                            <div className="text-danger">{formik.errors.phone}</div>
                        )}
                    </div>

                    {/* Floating Password Input */}
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

                    {/* Floating Confirm Password Input */}
                    <div className="form-floating mb-3 custom-form-floating">
                        <input
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.rePassword}
                            type="password"
                            className="form-control"
                            id="floatingConfirmPassword"
                            name="rePassword"
                            placeholder="Confirm Password"
                        />
                        <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                        {formik.errors.rePassword && formik.touched.rePassword && (
                            <div className="text-danger">{formik.errors.rePassword}</div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-success w-25">
                        {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
