import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate();
    const handleFormSubmit = (e) => {
        alert("Try creating real forms !!!")
    }
    return (
        <div className='min-h-screen bg-cover' style={{ backgroundImage: 'url(./gal.jpg)' }}>
            <div className='min-h-screen flex justify-between pl-11 pr-11 items-center text-white bg-black bg-opacity-20'>
                <div className='space-y-4 lg:w-2/3'>
                    <div>
                        <p className='md:text-4xl text-2xl'></p>
                        <h1 className='md:text-7xl text-3xl font-bold'>Form Wizard</h1>
                        <div className='md:w-1/2'>
                            <p>Unlock the artistry of creating forms in a second</p>
                        </div>
                        <div className='mt-3 flex flex-wrap  items-center gap-5'>
                            <button onClick={() => navigate(`/login`)} className='px-7 py-3 rounded-lg border bg-secondary font-bold uppercase'>Join Today</button>
                            <button onClick={() => navigate(`/createform`)} className='px-7 py-3 rounded-lg border bg-secondary font-bold uppercase'>Create Form</button>
                        </div>
                    </div>
                </div>
                <div className='lg:w-1/3 bg-black mt-8 md:mt-0 p-10'>
                    <form onSubmit={handleFormSubmit}>
                        <h1 className='font-bold text-white text-2xl text-center mb-5'>Forms</h1>
                        <label className='block text-white mt-3 font-bold mb-2' htmlFor='name'>Name:</label>
                        <input placeholder='Enter name' name='name' className='resize-none border w-full text-black p-2 rounded-lg border-secondary outline-none' />
                        <label className='block text-white mt-3 font-bold mb-2' htmlFor='email'>Email:</label>
                        <input placeholder='Enter email' name='email' className='resize-none border text-black w-full p-2 rounded-lg border-secondary outline-none' />
                        <div className='flex justify-center'>
                            <button className='btn-primary mt-5 hover:bg-red-400 duration-200 px-5 bg-blue-500 text-center'type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Hero
