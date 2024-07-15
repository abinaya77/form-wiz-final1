import React from 'react'

const Hero2 = () => {
  return (
    <div className='min-h-screen bg-cover 'style={{backgroundImage:'url(./aari-12.jpg)'}}>
        <div className='min-h-screen flex justify-start pl-11 items-center text-white bg-black bg-opacity-40'>
            <div className='space-y-4'>
                <div>
                    <p className='md:text-4xl text-2xl'>Best Online</p>
                    <h1 className='md:text-7xl text-3xl font-bold'>Courses from Home</h1>
                    <div className='md:w-1/2'>
                        <p>Unlock the artistry of Aari embroidery with our expert-led tutorials, perfect for mastering the intricacies of this exquisite craft </p>
                    </div>
                    <div className=' mt-3 gap-3 flex flex-wrap items-centergap-5'>
                        <button onClick={()=>navigate(`/login`)} className='px-7 py-3 rounded-lg  bg-secondary font-bold uppercase'>join today</button>
                        <button onClick={()=>navigate(`/classes`)} className='px-7  py-3 rounded-lg border hover: bg-secondary font-bold uppercase'>view course</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero2
