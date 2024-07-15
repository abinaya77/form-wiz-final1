import React from 'react'
import useAuth from '../../../hooks/useAuth'
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UpdateUser = () => {
    const{user}=useAuth();
    const userCredentials =useLoaderData();
    console.log(userCredentials)
    const axiosFetch=useAxiosFetch();
    const axiosSecure=useAxiosSecure();
    const navigate=useNavigate();

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        const formData=new FormData(e.target);
        const updatedData=Object.fromEntries(formData);
        axiosSecure.put(`/update-user/${userCredentials?._id}`,updatedData).then(res=>{
            if(res.data.modifiedCount>0){
                alert("user updated successfully--refresh to check")
            }
            console.log(res.data)
        }).catch(err=>console.log(err))

    }
  return (
    <div className='bg-indigo-200 '>
       <h1 className='text-center  text-4xl font-bold  mt-5'>Update <span className='text-secondary'>Form</span></h1>
       <p className='text-center'>Change details about {userCredentials.name}</p>
       {/**form starts here */}
       <section>
          <div className='mx-auto px-4 py-16 sm:px-6 lg:px-8'>
             <div className='rounded-lg bg-white p-8 shadow-lg lg:p-12'>
                <form className='space-y-4  'onSubmit={handleFormSubmit}>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                        <div>
                            <label className='ml-2 pb-4'htmlFor='name'>Name</label>
                            <input className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                            placeholder='your name'
                            type="text"
                            required
                            defaultValue={userCredentials?.name?userCredentials?.name:''}
                            id='name'
                            name='name'/>
                        </div>
                        <div>
                            <label className='ml-2 pb-4'htmlFor='phone'>Phone</label>
                            <input className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                            placeholder='phone number'
                            type="tel"
                            required
                            defaultValue={userCredentials?.phone?userCredentials?.phone:''}
                            id='phone'
                            name='phone'/>
                        </div>
                    </div>
                    {/**seond row */}
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                        <div>
                            <label className='ml-2 pb-4'htmlFor='email'>Email</label>
                            <input className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                            placeholder='your email'
                            type="email"
                            required
                            defaultValue={userCredentials?.email?userCredentials?.email:''}
                            id='email'
                            name='email'/>
                        </div>
                        <div>
                            <label className='ml-2 pb-4'htmlFor='skills'>Skills</label>
                            <input className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                            placeholder='your skills'
                            type="text"
                            required
                            defaultValue={userCredentials?.skills?userCredentials?.skills:''}
                            id='skills'
                            name='skills'/>
                        </div>
                    </div>
                    {/**thirs row */}
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                        <div>
                            <label className='ml-2 pb-4'htmlFor='address'>Address</label>
                            <input className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                            placeholder='your address'
                            type="text"
                            required
                            defaultValue={userCredentials?.address?userCredentials?.address:''}
                            id='address'
                            name='address'/>
                        </div>
                        <div>
                            <label className='ml-2 pb-4'htmlFor='photoURL'>Photo_URL</label>
                            <input className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                            placeholder='photo url'
                            type="text"
                            required
                            defaultValue={userCredentials?.photoURL?userCredentials?.photoURL:''}
                            id='photoURL'
                            name='photoURL'/>
                        </div>
                    </div>
                    {/**fourth row */}
                    <div>
                        <h1>Please select a role</h1>
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                            <div>
                                <input 
                                className='peer sr-only'
                                id="option1"
                                type="radio"
                                value="user"
                                dafaultChecked={userCredentials?.role ==='user' ? true:false}
                                tabIndex="-1"
                                name="option"
                                />
                                <label
                                htmlFor='option1'
                                className='block w-full rounded-lg border secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white'
                                tabIndex='0'
                                ><span className='text-sm font-medium'>User</span></label>
                            </div>
                            <div>
                                <input 
                                className='peer sr-only'
                                id="option2"
                                type="radio"
                                value="admin"
                                dafaultChecked={userCredentials?.role ==='admin' ? true:false}
                                tabIndex="-1"
                                name="option"
                                />
                                <label
                                htmlFor='option2'
                                className='block w-full rounded-lg border  secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white'
                                tabIndex='0'
                                ><span className='text-sm font-medium'>Admin</span></label>
                            </div>
                            <div>
                                <input 
                                className='peer sr-only'
                                id="option3"
                                type="radio"
                                value="instructor"
                                dafaultChecked={userCredentials?.role ==='instructor' ? true:false}
                                tabIndex="-1"
                                name="option"
                                />
                                <label
                                htmlFor='option3'
                                className='block w-full rounded-lg border  secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white'
                                tabIndex='0'
                                ><span className='text-sm font-medium'>Instructor</span></label>
                            </div>

                        </div>
                    </div>
                    {/**fifth row */}
                    <div>
                        <label className='sr-only' htmlFor='message'>About</label>
                        <textarea className='w-full resize-none rounded-lg border-secondary border outline-none p-3 text-sm'
                        placeholder='About user'
                        rows='4'
                        defaultValue={userCredentials?.about?userCredentials?.about:''}
                        name='about'
                        id='message'
                        ></textarea>
                    </div>
                    {/**button */}
                    <div className='mt-4'>
                        <button type='submit' className='inline-block w-full rounded-lg bg-secondary px-5 py-3 font-medium text-white sm:w-auto'>Update User</button>
                        <button  onClick={()=>navigate(`/dashboard/manage-users`)}className='inline-block ml-5 w-full rounded-lg bg-secondary px-5 py-3 font-medium text-white sm:w-auto'>Cancel</button>
                    </div>


                </form>
             </div>
          </div>
       </section>
    </div>
  )
}

export default UpdateUser
