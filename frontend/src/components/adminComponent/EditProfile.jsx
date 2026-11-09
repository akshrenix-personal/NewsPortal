import React, { useEffect } from 'react'
import Navbar from '../landingpage/Navbar';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaImage } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from '../../api';
import Swal from "sweetalert2";

const USerSchema = yup
  .object()
  .shape({
    name: yup.string().required().min(2),
    email: yup.string().required().email(),
    password: yup.string().transform(v => v || undefined).min(8).max(20),
    contact: yup.string().required().min(10),
    address: yup.string().required().min(2),
    profile: yup.mixed(),
  })


const EditProfile = () => {

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userInfo'))
    setValue('name', userData?.name);
    setValue('email', userData?.email);
    setValue('contact', userData?.contact);
    setValue('address', userData?.address);

  }, [])

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(USerSchema),
  });
  const handleUserRegister = async (data) => {
    const userData = JSON.parse(localStorage.getItem('userInfo'))
    const formData = new FormData();
    formData.append('name', data?.name);
    formData.append('email', data?.email);
    formData.append('contact', data?.contact);
    formData.append('address', data?.address);
    if (data?.profile?.[0]) formData.append('profile', data.profile[0]);
    if (data?.password) formData.append('password', data.password);
    formData.append('_id', userData?._id);
    const response = await axios.put('/user-update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    if (response?.data?.code == 200) {
      Swal.fire({
        title: "Profile Update",
        text: response?.data?.message,
        icon: "success"
      })
      localStorage.setItem('userInfo',JSON.stringify(response?.data?.data))

    } else {
      Swal.fire({
        title: "Profile Update",
        text: response?.data?.message,
        icon: "error"
      })
    }
  }

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center  mt-5 t">
        <div className="bg-white p-4 rounded shadow" style={{ width: "900px" }}>
          <h2 className="text-center text-color mb-4"><span className='text-dark'>Admin</span> Profile</h2>
          <form onSubmit={handleSubmit((d) => handleUserRegister(d))}>
            <div className="row g-3">
              {/* Name */}
              <div className="col-md-6">
                <label className="form-label">Your Name</label>
                <div className="input-group">
                  <span className="input-group-text"><FaUser /></span>
                  <input type="text" {...register('name')} className="form-control" placeholder="Enter your name" />
                </div>
                {errors?.name && <p className="pt-1 text-danger">{errors?.name?.message}</p>}
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label className="form-label">Your Email</label>
                <div className="input-group">
                  <span className="input-group-text"><FaEnvelope /></span>
                  <input type="email" disabled  {...register('email')} className="form-control" placeholder="Enter your email" />
                </div>
                {errors?.email && <p className="pt-1 text-danger">{errors?.email?.message}</p>}
              </div>

              {/* Phone */}
              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <div className="input-group">
                  <span className="input-group-text"><FaPhone /></span>
                  <input type="text" {...register('contact')} className="form-control" placeholder="Enter phone number" />
                </div>
                {errors?.contact && <p className="pt-1 text-danger">{errors?.contact?.message}</p>}
              </div>

              {/* Password */}
              <div className="col-md-6">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <span className="input-group-text"><FaLock /></span>
                  <input type="password" {...register('password')} className="form-control" placeholder="Leave blank to keep current password" autoComplete="new-password" />
                </div>
                {errors?.password && <p className="pt-1 text-danger">{errors?.password?.message}</p>}
              </div>

              {/* Country */}
              <div className="col-md-6">
                <label className="form-label">Address</label>
                <input type="text" {...register('address')} className="form-control" placeholder="Address" />
                {errors?.address && <p className="pt-1 text-danger">{errors?.address?.message}</p>}
              </div>

              {/* Profile Picture */}
              <div className="col-md-6 mb-4">
                <label className="form-label">Profile Picture</label>
                <div className="input-group">

                  <input type="file" {...register('profile')} className="form-control" />
                </div>
                {errors?.profile && <p className="pt-1 text-danger">{errors?.profile?.message}</p>}
              </div>

              {/* Submit Button */}
              <div className="text-center mt-3 mb-4 ">
                <input type="submit" value="Update" className="btn button text-light px-4 w-50 mx-2" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default EditProfile
