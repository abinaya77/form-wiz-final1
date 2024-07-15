import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleLogin = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    googleLogin()
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          const userImp = {
            name: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL,
            role: 'user',
            gender: 'is not specified',
            address: 'is not specified',
            phone: 'is not specified',
          };

          if (user.email && user.displayName) {
            return axios.post('https://form-wiz.onrender.com/new-user', userImp, {
              headers: {
                Authorization: `Bearer ${userCredential._tokenResponse.idToken}`, // Assuming you get the token here
              },
            });
          }
        }
      })
      .then((response) => {
        console.log('User added successfully', response.data);
        navigate('/'); // Redirect or perform other actions after successful login
      })
      .catch((error) => {
        console.error('Error during login:', error.message);
      });
  };

  return (
    <div className='flex items-center justify-center my-3'>
      <button
        onClick={handleLogin}
        className='flex items-center outline-none bg-white border border-gray-300 rounded-lg shadow-md px-6 py-4 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none'
      >
        <FcGoogle className='h-6 w-6 mr-2' />
        <span>Continue With Google</span>
      </button>
    </div>
  );
};

export default GoogleLogin;
