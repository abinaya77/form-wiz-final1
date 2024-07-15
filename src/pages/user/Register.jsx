import React, { useContext } from 'react'
import {useForm} from "react-hook-form"
import {AiOutlineLock, AiOutlineMail, AiOutlinePhone, AiOutlinePicture, AiOutlineUser} from "react-icons/ai"
import {HiOutlineLocationMarker} from "react-icons/hi"
import { Link, useNavigate } from "react-router-dom"
import GoogleLogin from '../../components/Social/GoogleLogin'
import { AuthContext } from '../../utilities/providers/AuthProviders'
import axios from 'axios'

const Register = () => {
  const navigate=useNavigate();
  const{signUp,updateUser,setError}=useContext(AuthContext)
    const {register,handleSubmit,watch,formState:{errors}}=useForm();
    const onSubmit=(data)=>{
      setError('')
      //console.log(data);
      signUp(data.email,data.password).then((result)=>{
        console.log("this is result",result)
        const user=result.user;
        if(user){
          return updateUser(data.name,data.photoUrl).then(()=>{
            const userImp={
              name:user?.displayName,
              email:user?.email,
              photoURL:user?.photoURL,
              role:'user',
              gender:data.gender,
              phone:data.phone,
              address:data.address
            }
            if(user.email && user.displayName){
              return axios.post('https://form-wiz.onrender.com/new-user',userImp).then(()=>{
                setError("")
                navigate('/');
                return "registration successful"
              }).catch((err)=>{
                setError(err.code);
                throw new Error(err);
              })
            }
          })
        }
      })
    }
    const password=watch('password','')
  return (
    <div className='flex justify-center items-center pt-14 bg-gray-100'>

        <div className='bg-white p-8 rounded-lg shadow-emerald-200'>
           <h2 className='text-3xl font-bold text-center mb-6'>Please Register</h2>

           {/**form data fields */}
           <form onSubmit={handleSubmit(onSubmit)}>
               <div className='flex items-center gap-5'>
                   <div className='mb-4'>
                       <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
                        <AiOutlineUser className='inline-block mr-2 mb-1 text-lg'/>
                        Name
                       </label>
                       <input type="text" placeholder='enter your name' {...register("name",{required:true})}
                       className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                      focus:border-blue-300'
                      />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>
                          <AiOutlineMail className='inline-block mr-2 mb-1 text-lg'/>
                          Email
                        </label>
                        <input type="email" placeholder='enter your email' {...register("email",{required:true})}
                        className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                       focus:border-blue-300'
                        />
                   </div>
                </div>

                {/**for second row --pwd nd confirm pwd */}
                <div className='flex items-center gap-5'>
                    <div className='mb-4'>
                       <label htmlFor='password' className='block text-gray-700 font-bold mb-2'>
                           <AiOutlineLock className='inline-block mr-2 mb-1 text-lg'/>
                           Password
                        </label>
                        <input type="password" placeholder='enter password' {...register("password",{required:true})}
                         className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                         focus:border-blue-300'
                       />
                    </div>
                    <div className='mb-4'>
                       <label htmlFor='confirmPassword' className='block text-gray-700 font-bold mb-2'>
                        <AiOutlineLock className='inline-block mr-2 mb-1 text-lg'/>
                        Confirm Password
                       </label>
                       <input type="password" placeholder='confirm password' {...register("confirmPassword",{required:true,
                       validate:(value)=>value===password ||"password does not match"})}
                       className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                       focus:border-blue-300'
                       />
                    </div>
                </div>

                {/**for third row --phone nd photo */}
                <div className='flex items-center gap-5'>
                    <div className='mb-4'>
                       <label htmlFor='phoneNumber' className='block text-gray-700 font-bold mb-2'>
                        <AiOutlinePhone className='inline-block mr-2 mb-1 text-lg'/>
                        Phone
                       </label>
                       <input type="tel" placeholder='enter phone number' {...register("phone",{required:true})}
                       className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                       focus:border-blue-300'
                       />
                    </div>
                    <div className='mb-4'>
                       <label htmlFor='photoUrl' className='block text-gray-700 font-bold mb-2'>
                        <AiOutlinePicture className='inline-block mr-2 mb-1 text-lg'/>
                        Photo URL
                      </label>
                      <input type="text" placeholder='photo Url' {...register("photoUrl")}
                      className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring
                      focus:border-blue-300'
                      />
                   </div>
                </div>

                {/**gender and text area */}
                <div>
                    <div className='mb-4'>
                       <label htmlFor='gender' className='block text-gray-700 font-bold mb-2'>
                        <AiOutlineUser className='inline-block mr-2 mb-1 text-lg'/>
                        Gender
                       </label>
                       <select {...register("gender",{required:true})} className='w-full border border-gray-300
                           rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'>
                          <option value="">Select Gender</option>
                          <option value="Female">female</option>
                          <option value="Male">male</option>
                          <option value="Other">other</option>

                        </select>
                    </div>
                    <div className='mb-4'>
                      <label htmlFor='address' className='block text-gray-700 font-bold mb-2'>
                        <HiOutlineLocationMarker className='inline-block mr-2 mb-1 text-lg'/>
                        Address
                      </label>
                      <textarea
                      {...register("address",{required:true})}
                      rows="3"
                      className='w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'
                      placeholder='Enter Address'
                      ></textarea>
                    </div>
                </div>

                {/**submit button */}
                <div className='text-center'>
                    <button type="submit" className='bg-secondary hover:bg-red-500 text-white py-2 px-4 rounded-md'>Register</button>
                    {
                        errors.confirmPassword && (<div className='text-red-500 text-sm w-fullmt-1'>
                            <p>Password doesnt match!</p>
                        </div>)
                    }
                </div>
            </form>
            <p className='text-center mt-4'>
                Already have an account ?<Link to="/login" className='underline text-secondary ml-1'>Login</Link>
            </p>
            <GoogleLogin/>

        </div>
    </div>
  )
}

export default Register
