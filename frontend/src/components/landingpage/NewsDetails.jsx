import React, { useEffect, useState } from 'react'
import { LuNewspaper } from "react-icons/lu";
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

function NewsDetails() {
    const [data, setData] = useState('')
    useEffect(() => {
        const raw = JSON.parse(localStorage.getItem('newsDetails'));
        setData(raw)
    }, [])
    const location = useLocation();

    return (
        <>
            {location?.pathname !== "/" && <Navbar />}

            <div className='row py-2 bg-light'>
                <p className='fs-3 text-center'>News <b className='text-mycolor'>Details</b></p>
                <div className='col-sm-10 mx-auto'>
                    <div className='row py-3'>
                        <div className='col-sm-10 mx-auto'>
                            <div className='card p-2 border border-0 shadow-lg'>
                                <div className='row g-0'>
                                    <div className='col-sm-6 '>

                                        {
                                            data?.type == "image" ?
                                                <img src={data?.url} className='img-thumbnail w-100' /> :
                                                <iframe
                                                    className='video_div_detail w-100'
                                                    src={data?.url}
                                                    title="YouTube video player"
                                                    frameBorder={0}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen=""
                                                />
                                        }


                                        <p className='ps-1'>Last Updated At : {new Date(data?.createAt)?.toDateString()}</p>
                                        <p className='ps-1'>{data?.city}</p>

                                    </div>
                                    <div className='col-sm-6 px-2'>
                                        <h5 className='text-center'><span className='text-mycolor fw-bold'>Title :</span> {data?.title}</h5>
                                        <p className='des-dtails text-justify p-2'>{data?.desc}</p>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}
export default NewsDetails;