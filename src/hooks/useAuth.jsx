import React, { useContext } from 'react'
import { AuthContext } from '../utilities/providers/AuthProviders'

const useAuth = () => {
  const auth=useContext(AuthContext);
  return auth;
}

export default useAuth
