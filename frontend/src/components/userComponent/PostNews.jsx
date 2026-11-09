
import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Navbar from '../landingpage/Navbar';
import axios from '../../api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const Newsschema = yup
  .object()
  .shape({
    title: yup.string().required().min(2).max(20),
    category: yup.string().required(),
    city: yup.string().required(),
    type: yup.string().required(),
    url: yup.string().required(),
    desc: yup.string().required().min(2).max(1000),
  })
const PostNews = () => {
  const Navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(Newsschema),
  });
  const handleAddNews = async (data) => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const finalObj = { ...data, userId: user?._id };
    const response = await axios.post('/add-news', finalObj)
    if (response?.data?.code == 200) {
      Swal.fire({
        title: "News add",
        text: response?.data?.message,
        icon: "success"
      })
      Navigate('/user-list')
      reset()
    } else {
      Swal.fire({
        title: "News add",
        text: response?.data?.message,
        icon: "error"
      })
    }

  }
  return (<>
    <Navbar />
    <div className="container-fluid p-5">
      <div className="row">
        <div className="col-md-7 col-sm-10 mx-auto">
          <div className="row">
            <div className=" col-md-8 col-sm-10 mx-auto border rounded-1 py-3 px-4 shadow-lg">
              <div className='fs-3'>Post <b className='headingText'>News</b></div>
              <form onSubmit={handleSubmit((d) => handleAddNews(d))}>
                <div className="row my-3">
                  <div className="col-3 pt-2" >Title</div><br />
                  <div className="col-9">
                    <input {...register('title')} type="text" placeholder="Enter news title" className='form-control' />
                    {errors?.title && <p className='text-danger'>{errors?.title?.message}</p>}
                  </div>
                </div>
                <div>
                </div>
                <div>
                </div>
                <div>
                  <div className="row my-3">
                    <div className="col-3 pt-2">Category</div>
                    <div className="col-9">
                      <select {...register('category')} className='form-control form-dropdown'>
                        <option value="Politics">Politics</option>
                        <option value="Sports">Sports</option>
                        <option value="Technology">Technology</option>
                        <option value="Education">Education</option>
                        <option value="Business">Business</option>
                        <option value="Health">Health</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Travel">Travel</option>
                        <option value="Science">Science</option>
                        <option value="Others">Others</option>
                      </select>
                      {errors?.category && <p className='text-danger'>{errors?.category?.message}</p>}
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-3 pt-2">City</div>
                    <div className="col-9">
                      <input type='text' {...register('city')} placeholder='Enter the City Name' className='form-control' />
                      {errors?.city && <p className='text-danger'>{errors?.city?.message}</p>}
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-3 pt-2">Media Type</div>
                    <div className="col-9">
                      <select {...register('type')} className='form-control form-dropdown'>
                        <option value="image">image</option>
                        <option value="video">video</option>
                      </select>
                      {errors?.type && <p className='text-danger'>{errors?.type?.message}</p>}
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-3 pt-2">Media Url</div>
                    <div className="col-9">
                      <input {...register('url')} type="text" className='form-control' placeholder='Enter image URL' />
                      {errors?.url && <p className='text-danger'>{errors?.url?.message}</p>}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="row my-3">
                    <div className="col-3 pt-2">Description</div>
                    <div className="col-9">
                      <textarea {...register('desc')} className='form-control' ></textarea>
                      {errors?.desc && <p className='text-danger'>{errors?.desc?.message}</p>}
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-sm-3 p-0"></div>
                    <div className="col-md-8 p-0">
                      <input className='w-100 text-light ms-3 rounded-3 btn themeBtn' type="submit" value="Post News" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default PostNews;