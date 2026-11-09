import React, { useEffect, useState } from 'react'
import Navbar from '../landingpage/Navbar'
import axios from '../../api';
import Swal from 'sweetalert2';
const YourNews = () => {
  const [newsList, setNewsList] = useState([])
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const userData = JSON.parse(localStorage.getItem('userInfo'))
    const response = await axios.get(`/user-your-news?userId=${userData?._id}`)
    if (response?.data?.code == 200) {
      setNewsList(response?.data?.data)
    }
  }

  const showDescription = (des) => {
    Swal.fire({
      text: des,
      icon: "info"
    })
  }

  return (
    <>
      <Navbar />
      <div className="row mt-3">
        <div className="col-sm-1"></div>
        <div className="col-sm-10">
          <h2 className='text-center'>Your<span className='text-color'> News</span></h2>
          <table className="table">
            <thead className='table table-dark'>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Category</th>
                <th scope="col">City</th>
                <th scope="col">Media</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {newsList?.map((item, index) => {
                return (<>
                  <tr>
                    <th >{item?.title}</th>
                    <td>{item?.category}</td>
                    <td>{item?.city}</td>
                    <td>{
                      item?.type == "image" ? <img height='60' width='100' src={item?.url} /> :
                        <iframe
                          height='60' width='100'
                          src={item?.url}
                          title="YouTube video player"
                          frameBorder={0}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen=""
                        />
                    }</td>

                    <td onClick={() => showDescription(item?.desc)} >{item?.desc?.slice(0, 15)}...</td>
                  </tr>
                </>)
              })}
            </tbody>
          </table>
          {newsList?.length == 0 && <h3 className='text-center'>No Records Found</h3>}
        </div>
        <div className="col-sm-1"></div>
      </div>
    </>
  )
}
export default YourNews
