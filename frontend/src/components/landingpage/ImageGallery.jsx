
import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api';
function ImageGallery() {
  const location = useLocation()
  const navigate=useNavigate()
  const [data, setData] = useState([])
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await axios.get('/top-city');
    if (response?.data?.code == 200) {
      setData(response?.data?.data)
    }
  }

  return (
    <>
      {location?.pathname !== "/" && <Navbar />}
      <div className='row py-2'>
        <p className='text-center fs-3'>Image <b className='text-color'>Gallery</b></p>
        <div className='col-sm-10 mx-auto'>
          <div className='row py-3  d-flex justify-content-center'>
            {data?.map((item) => { 
              return (<>
                <div onClick={()=>{localStorage.setItem("newsDetails",JSON.stringify(item));navigate('/news-details')}}  className='col-sm-2  mb-3'>
                  <a href='#'>
                    <div className="card mx-auto shadow-lg catcard border border-0 ">
                      <img  height={140} width='100%' src={item?.url} />
                      
                    </div>
                  </a>
                </div>
              </>)
            })} 
            { data?.length==0 && <h3 className='text-center'>No Record Found</h3>} 
          </div>
        </div>
      </div>
    </>
  )
}
export default ImageGallery

