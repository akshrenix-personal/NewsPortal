
import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from '../../api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';
const schema = yup
  .object()
  .shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(8).max(16),
  })

const Login = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data) => {
    const response = await axios.post('/login', data);
    if (response?.data?.code == 200) {
      Swal.fire({
        title: "Login",
        text: response?.data?.message,
        icon: "success"
      });
      // navigate('/user-profile')
      localStorage.setItem("userInfo", JSON.stringify(response?.data?.data)); 

      if (response?.data?.data?.userType == "user") {
        navigate('/user-alllist')
      } else if (response?.data?.data?.userType == "admin") {
        navigate('/admin-newslist')
      }

    } else {
      Swal.fire({
        title: "Login",
        text: response?.data?.message,
        icon: "error"
      });
    }

  }
  return (
    <>

      <Navbar />
      <div className="d-flex justify-content-center align-items-center vh-50 mx-auto mt-2" style={{ width: "100%", marginLeft: "230px", height: "400px" }}>
        <div className="card p-4 shadow " style={{ width: "400px", minHeight: "350px" }}>
          <h3 className="text-center mb-4">
            <span className="text-color fw-bold">Login</span>
          </h3>

          <form onSubmit={handleSubmit((d) => handleLogin(d))}>
            <div className="mb-2">
              <label className="form-label">E-mail</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                {...register('email')}
              />
              {errors.email && <p className='text-danger'>{errors.email?.message}</p>}
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                {...register('password')}
              />
              {errors.password && <p className='text-danger'>{errors.password?.message}</p>}
            </div>
            <input type="submit" className="btn text-light login-button bg-color w-100 mb-3" value="Login" />


          </form>
        </div>
      </div>
    </>
  )
}

export default Login



