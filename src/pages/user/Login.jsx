import React, { useState } from 'react'
import {MdOutlineAlternateEmail, MdOutlineRemoveRedEye} from "react-icons/md"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import GoogleLogin from '../../components/Social/GoogleLogin'
import useAuth from '../../hooks/useAuth'

const Login = () => {
    const [showPassword,setshowPassword]=useState(false)
    const location=useLocation();
    const{login,error,setError,loader,setLoader}=useAuth()
    const navigate=useNavigate();

    const handleSubmit=e=>{
        setError('');
        e.preventDefault();

        const data=new FormData(e.target);
        const formData=Object.fromEntries(data)
        login(formData.email,formData.password).then(()=>{
            alert("login successful")
            navigate(location.state?.from ||'/dashboard')
        }).catch((err)=>{
            setError(err.code);
            setLoader(false);
        })
    }
  return (
    <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
        <h1 className='text-2xl font-bold text-secondary sm:text-3xl text-center'>Get Started Today</h1>
        <p className='mx-auto mt-4 max-w-md text-center text-gray-500'>Create stunning forms instantly</p>
        <div className='mx-auto max-w-lg mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8'>
            <GoogleLogin/>
            
        </div>
    </div>
  )
}

export default Login
