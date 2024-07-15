import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { IoAccessibilitySharp } from "react-icons/io5";
import { FaFile } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { FaDatabase } from "react-icons/fa";

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
       <div className='grid grid-cols-1 gap-3 px-4 mt-8 sm:grid-cols-4 sm:px-8'>
          <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
             <div className='p-4 bg-green-400'>
                <IoAccessibilitySharp className='h-12 w-12 text-white'/>
             </div>
             <div className='px-4 text-gray-700'>
                <h3 className='text-sm tracking-wider'>Total Enrolled </h3>
                <p className='text-3xl'>{data?.totalEnrolled}</p>
             </div>
          </div>
          {/**second */}
          <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
             <div className='p-4 bg-blue-400'>
                <FaFile  className='h-12 w-12 text-white'/>
             </div>
             <div className='px-4 text-gray-700'>
                <h3 className='text-sm tracking-wider'>Total Instructors  </h3>
                <p className='text-3xl'>{data?.instructors}</p>
             </div>
          </div>
          {/**third */}
          <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
             <div className='p-4 bg-red-400'>
                <SiGoogleclassroom  className='h-12 w-12 text-white'/>
             </div>
             <div className='px-4 text-gray-700'>
                <h3 className='text-sm tracking-wider'>Total Classes  </h3>
                <p className='text-3xl'>{data?.totalClasses}</p>
             </div>
          </div>
          {/**pending classes */}
          <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
             <div className='p-4 bg-orange-400'>
                <FaDatabase  className='h-12 w-12 text-white'/>
             </div>
             <div className='px-4 text-gray-700'>
                <h3 className='text-sm tracking-wider'>Pending Classes  </h3>
                <p className='text-3xl'>{data?.pendingClasses}</p>
             </div>
          </div>
       </div>
    </div>
  )
}

export default AdminStats
