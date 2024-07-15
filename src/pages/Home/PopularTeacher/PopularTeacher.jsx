import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AdminStats = (users) => {
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
      <h1 className='text-4xl items-center text-center dark:text-white text-black mt-20'>Key Benefits</h1>
       <div className='grid  grid-cols-1 gap-3 px-4 mt-20 sm:grid-cols-3 sm:px-8'>
          <div className='flex items-center bg-slate-100 border rounded-sm overflow-hidden shadow'>
             
             <div className='px-4 text-gray-700'>
                <h3 className='text-sm mt-3 tracking-wider'>Access forms effortlessly with our intuitive design </h3>
                <p className='text-3xl mt-3 mb-3'>Easy Access </p>
             </div>
          </div>
          {/**second */}
          <div className='flex items-center bg-slate-100 border rounded-sm overflow-hidden shadow'>
             
             <div className='px-4 text-gray-700'>
                <h3 className='text-sm mt-3 tracking-wider'>Easily create and manage multiple forms with our versatile and user-friendly platform. </h3>
                <p className='text-3xl mt-3 mb-3 '>Create Mutilple-forms</p>
             </div>
          </div>
          {/**third */}
          <div className='flex items-center bg-slate-100 border rounded-sm overflow-hidden shadow'>
             
             <div className='px-4 text-gray-700'>
                <h3 className='text-sm mt-3 tracking-wider'>Embed forms effortlessly into any website with our simple integration tools. </h3>
                <p className='text-3xl mt-3 mb-3'>Embed Forms Easily</p>
             </div>
          </div>
          
       </div>
    </div>
  )
}

export default AdminStats
