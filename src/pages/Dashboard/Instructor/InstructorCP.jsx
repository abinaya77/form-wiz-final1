import React from 'react'
import bgImg from "../../../assets/dashboard/jaconda-14.png"

const InstructorCP = () => {
  return (
    <div>
       <h1 className='text-center font-bold text-3xl'>Welcome Instructor!!</h1>
       <div className='h-screen'>
        <img src={bgImg} alt="" className='h-full w-fit'/>
       </div>
    </div>
  )
}

export default InstructorCP
