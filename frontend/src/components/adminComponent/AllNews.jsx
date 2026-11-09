
import React, { useEffect, useState } from 'react'
import Navbar from '../landingpage/Navbar'
import axios from '../../api';
import Swal from 'sweetalert2'
const AllNews = () => {
  const [newsList, setNewsList] = useState([])
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await axios.get(`/admin-all-list`)
    if (response?.data?.code == 200) {
      setNewsList(response?.data?.data)
    }
  }
  const handleApproval = async (id, status) => {
    const response = await axios.put('/admin-news-approved', { _id: id, isApproved: !status });
    if (response?.data?.code == 200) {
      Swal.fire({
        title: "Approval",
        text: response?.data?.message,
        icon: "success"
      })
      fetchData()
    } else {
      Swal.fire({
        title: "Approval",
        text: response?.data?.message,
        icon: "error"
      })
    }
  }
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.post('/delete-news', { _id });
        if (response?.data?.code == 200) {
          Swal.fire({
            title: "News Delete",
            text: response?.data?.message,
            icon: "success"
          })
          fetchData()
        }else{
           Swal.fire({
            title: "News Delete",
            text: response?.data?.message,
            icon: "error"
          })
        }
      }
    });
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
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
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
                    <td>{item?.desc?.slice(0, 15)}...</td>
                    <td>{item?.isApproved ? "Approved" : "Not Approved!"}</td>
                    <td>
                      <button onClick={() => handleApproval(item?._id, item?.isApproved)} className='btn btn-warning  '>{item?.isApproved ? "No" : "Yes"}</button>
                      <button onClick={() => handleDelete(item?._id)} className='ms-1 btn btn-danger'>Delete</button>

                    </td>
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
export default AllNews

