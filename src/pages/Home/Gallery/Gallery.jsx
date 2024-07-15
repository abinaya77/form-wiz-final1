import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom'

const AdminStats = (users) => {
  const navigate = useNavigate();
    const[data,setData]=useState();
    const axiosSecure=useAxiosSecure();

    useEffect(()=>{
        axiosSecure.get('/admin-stats')
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))
    },[])
    console.log("data is ",data)
  return (
    <div>
      <h1 className='text-4xl items-center text-center dark:text-white text-black mt-10'>Pricing</h1>
       <div className='grid  grid-cols-1 gap-3 px-4 mt-10 sm:grid-cols-3 sm:px-8'>
          <div className=' items-center bg-white border rounded-sm overflow-hidden shadow'>
             <div className=' text-gray-700 px-4 '>
              <div className='bg-slate-200 items-center text-center'>
                 <h1 className='text-bold text-2xl '>Free</h1>
              </div>
              
                <h3 className='text-3xl mt-3 text-center'>$ 0/mo </h3>
                <p className='text-sm mt-3 tracking-wider text-center items-center'>5 Forms per Day </p>
                <p className='text-sm mt-1 text-center tracking-wider'>only input,email,textarea fields </p>
                <div className='text-center mt-3 mb-3 '>
                  <button onClick={() => navigate(`/login`)} className='text-blue-400 border text-1xl'>Sign Up for free</button>
                </div>
             </div>
          </div>
          {/**second */}
          <div className=' items-center bg-white border rounded-sm overflow-hidden shadow'>
             
             <div className='px-4 text-gray-700'>
             <div className='bg-slate-200 items-center text-center'>
                 <h1 className='text-bold text-2xl '>Pro</h1>
              </div>
              
                <h3 className='text-3xl mt-3 text-center'>$ 10/mo </h3>
                <p className='text-sm mt-3 tracking-wider text-center items-center'>50 Forms per Day </p>
                <p className='text-sm mt-1 text-center tracking-wider'>Additional fields included </p>
                <div onClick={() => navigate(`/login`)} className='text-center mt-3 mb-3 bg-secondary'>
                  <button onClick={() => navigate(`/login`)} className='text-white  rounded-lg mt-1  text-1xl'>Get Started</button>
                </div>
             </div>
          </div>
          {/**third */}
          <div className=' items-center bg-white border rounded-sm overflow-hidden shadow'>
             <div className='px-4 text-gray-700'>
             <div className='bg-slate-200 items-center text-center'>
                 <h1 className='text-bold text-2xl '>Enterprise</h1>
              </div>
              
                <h3 className='text-3xl mt-3 text-center'>$ 29/mo </h3>
                <p className='text-sm mt-3 tracking-wider text-center items-center'>Unlimited access </p>
                <p className='text-sm mt-1 text-center tracking-wider'>Additional fields included </p>
                <div onClick={() => navigate(`/login`)} className='text-center mt-3 mb-3 bg-secondary'>
                  <button onClick={() => navigate(`/login`)} className='text-white  text-1xl'>Contact Us</button>
                </div>
             </div>
          </div>
          
       </div>
    </div>
  )
}

export default AdminStats
