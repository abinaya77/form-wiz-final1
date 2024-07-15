import React, { useEffect, useState } from 'react'
import useUser from '../../../../hooks/useUser'
import useAxiosFetch from '../../../../hooks/useAxiosFetch';
import {FiUser,FiMail,FiBriefcase,FiSend} from 'react-icons/fi'

const AsInstructor = () => {
  const {currentUser}=useUser();
  const[submittedData,setSubmittedData]=useState({});
  const[loading,setLoading]=useState(true);
  const axiosFetch=useAxiosFetch();

  
  useEffect(()=>{
    axiosFetch.get(`/applied-instructors/${currentUser?.email}`)
    .then(
      res=>{
        console.log(data)
        setSubmittedData(res.data);
        setLoading(false);
      }
    ).catch((err)=>console.log(err))
  },[])

  const onSubmit=(e)=>{
    e.preventDefault();
    const name=e.target.name.value;
    const email=e.target.email.value;
    const experience=e.target.experience.value;
    const data={
      name,email,experience
    }
    axiosFetch.post(`/as-instructor`,data).then(res=>{
      console.log(res.data);
      alert("successfully applied!!")
    })
    
  }


  return (
    <div className='py-20'>
      <h1 className='font-bold text-center '>Apply For Instructor</h1>
      <div className='py-20'>
        {
          !submittedData?.name && (<div>
            <form onSubmit={onSubmit}>
              <div className='flex w-full'>
              <div className=''>
                <div className='mb-4 w-full'>
                  <label className='text-gray-700' htmlFor='name'>Name</label>
                  
                </div>
                <div className='flex items-center mt-1'>
                  <FiUser className='text-gray-500'/>
                  <input type='text' id='name' name='name' defaultValue={currentUser?.name} disabled readOnly className='ml-2 w-full border-b
                   border-gray-300 focus:border-secondary outline-none'/>
                </div>
              </div>

              <div className=''>
                <div className='mb-4 w-full'>
                  <label className='text-gray-700' htmlFor='email'>Email</label>
                  
                </div>
                <div className='flex items-center mt-1'>
                  <FiMail className='text-gray-500'/>
                  <input type='text' id='email' name='email' defaultValue={currentUser?.email} disabled readOnly className='ml-2 w-full border-b
                   border-gray-300 focus:border-secondary outline-none'/>
                </div>
              </div>

              </div>
              
              <div className='py-10'>
                <div className='mb-4 w-full flex gap-3'>
                <FiBriefcase className='text-gray-500'/>
                  <label className='text-gray-700' htmlFor='experience'> Experience</label>
                </div>
                <div className='flex items-center mt-1'>
                  
                  <textarea
                      rows="3"
                      name='experience'
                      className='w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'
                      placeholder='Share your Experience'
                      ></textarea>
                </div>
              </div>

              {/**submit button */}
              <div className='text-center'>
                    <button type="submit" className='bg-secondary hover:bg-red-500 text-white py-2 px-4 rounded-md'>Submit</button>
                </div>
            </form>
          </div>)
        }
      </div>
    </div>
  )
}

export default AsInstructor
