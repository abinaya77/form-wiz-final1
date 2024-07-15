import React from 'react'

const Aboutus = () => {
    const handleFormSubmit=(e)=>{
        console.log("do submitting logic here ")

    }
  return (
    <div>
        {/**breadcrum or header banner */}
        <div className='breadcrumbs bg-primary py-20 mt-7 section-padding bg-cover bg-center bg-no-repeat'>
            <div className='container text-center'>
                <h2 className='font-bold text-3xl'>About Us</h2>
            </div>
        </div>
        {/**diving content into 2 sec */}
        <div className='nav-tab-wrapper tabs section-padding mt-8'>
            <div className='container'>
                <div className='grid grid-cols-12 md:gap-[30px]'>
                    {/**left side */}
                    <div className='lg:col-span-8  ml-5 col-span-12'>
                      <h2 className='font-semibold  mt-2 text-2xl'>💖who we are?</h2>
                      <p>Welcome to Mayur Fashions, where creativity meets innovation! We're dedicated to revolutionizing aari designs and empowering individuals like you to thrive in a world of endless possibilities. 🚀</p>
                       <h2 className='font-semibold mt-2 text-2xl'>Our Vision</h2>
                       <p>From the outset, our vision has been clear: to redefine aari work designs by blending cutting-edge technology with unparalleled creativity. We're committed to pushing boundaries and shaping the future of Mayur Fashions.</p>
                       <h2 className='font-semibold mt-2 text-2xl'>Our Story</h2>
                        <p>Born from a shared passion for designs, Mayur Fashions began with a mission to provide best designs at bugdet friendly cost . Since then, we've grown into a dynamic team driven by a relentless pursuit of excellence.</p>
                        <h2 className='font-semibold mt-3 text-2xl'>🌟 Why Choose Us?</h2>
                        <p className='mt-4'><span className='text-1xl  font-semibold'>🎭Innovation & Excellence:</span> We're not just keeping up with industry trends; we're setting them. Expect nothing less than innovative solutions and exceptional service.</p>
                        <p className='mt-4'><span className='text-1xl  font-semibold'>🌿Customer-Centric Approach:</span> Your satisfaction is our priority. We tailor our services to meet your unique needs and exceed your expectations.</p>
                        <p className='mt-4'><span className='text-1xl   font-semibold'>🌟Collaborative Spirit:</span> We believe in the power of collaboration. Join us in shaping the future and making a lasting impact together.</p>

                    </div>
                    {/**right isde */}
                    <div className='lg:col-span-4 col-span-12 mt-8 bg-blue-200 ml-10 md:mt-0'>
                        <div className='sidebarWrapper space-y-[30px]'>
                            <div className='wdiget custom-text space-y-10 max-w-[100%]'>
                                <form onSubmit={handleFormSubmit}>
                                   <h1 className='text-2xl font-bold text-center  mt-5 ml-5'>Contact us!</h1>
                                   <p className='text-gray-500 text-[15px] ml-5 items-center text-center'>Contact Us Effortlessly</p>
                                   <div className='px-3'>
                                     <label className='ml-2 font-semibold pb-4'htmlFor='name'>Name</label>
                                     <input className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                                        placeholder='your name'
                                        type="text"
                                        required
                                        id='name'
                                        name='name'/>
                                    </div>
                                    <div className='mt-3 px-3'>
                                     <label className='ml-2 font-semibold pb-4'htmlFor='email'>Email</label>
                                     <input className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                                        placeholder='your email'
                                        type="text"
                                        required
                                        id='email'
                                        name='email'/>
                                    </div>
                                    <div className='mt-3 px-3'>
                                     <label className='ml-2 font-semibold pb-4'htmlFor='phone'>Phone</label>
                                     <input className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                                        placeholder='your mobile no'
                                        type="text"
                                        required
                                        id='phone'
                                        name='phone'/>
                                    </div>
                                    <div className='mt-3 px-3'>
                                      <label className='ml-2 font-semibold pb-4' htmlFor='message'>About</label>
                                      <textarea className='w-full mt-3 resize-none rounded-lg border-secondary border outline-none p-3 text-sm'
                                         placeholder='Your Message'
                                         rows='4'
                                          name='about'
                                         id='message'
                                       ></textarea>
                                    </div>
                                    <div className=' items-center py-5 text-center'>
                                       <button type='submit' className='inline-block w-full rounded-lg bg-secondary px-5 py-3 font-medium text-white sm:w-auto'>Contact Now</button>
                                     </div>
                                </form>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
  )
}

export default Aboutus
