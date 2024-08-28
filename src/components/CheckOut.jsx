import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { CartContext } from '../components/Context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Checkout() {
  const { cartId } = useParams();
  const { checkOut } = useContext(CartContext);

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: async (values) => {
      try {
        const { data } = await checkOut(cartId, 'http://localhost:5173', values);
        if (data.status === 'success') {
          window.location.href = data.session.url;
        }
        console.log(data);
      } catch (error) {
        console.error('Checkout failed:', error);
      }
    },
  });

  return (
    <div className="container py-5">
      <h2 className="mb-4 font-weight-bold text-success">Checkout Now</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="details">Enter Your Address Details</label>
          <input
            type="text"
            className="form-control"
            id="details"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your address"
          />
          {formik.touched.details && formik.errors.details ? (
            <small className="form-text text-danger">{formik.errors.details}</small>
          ) : null}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="phone">Enter Your Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your phone number"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <small className="form-text text-danger">{formik.errors.phone}</small>
          ) : null}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="city">Enter Your City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your city"
          />
          {formik.touched.city && formik.errors.city ? (
            <small className="form-text text-danger">{formik.errors.city}</small>
          ) : null}
        </div>

        <button type="submit" className="btn btn-success btn-lg w-100">
          Pay Now
        </button>
      </form>
    </div>
  );
}
