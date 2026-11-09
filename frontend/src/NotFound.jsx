import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const NotFound = () => {
    const nav=useNavigate()
    useEffect(()=>{
// nav('/login')
    })
  return (
    <div>NotFound</div>
  )
}

export default NotFound