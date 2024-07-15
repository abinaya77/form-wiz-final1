import React, { createContext, useEffect, useState } from 'react';
import { app } from '../../config/firebase.init';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');

  const auth = getAuth(app);

  // Sign up new user
  const signUp = async (email, password) => {
    try {
      setLoader(true);
       const userCredential=await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      return userCredential;
    } catch (error) {
      setError(error.code);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setLoader(true);
      const userCredential=await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      return userCredential;
    } catch (error) {
      setError(error.code);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('token');
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };

  // Update user profile
  const updateUser = async (name, photo) => {
    try {
      
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo
      });
      setUser(auth.currentUser);
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };

  // Google login
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    try {
      setLoader(true);
      const userCredential=await signInWithPopup(auth, googleProvider);
      setUser(userCredential.user);
      return userCredential;
    } catch (error) {
      setError(error.code);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  // Observer for user state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const { data } = await axios.post('https://form-wiz.onrender.com/api/set-token', {
            email: user.email,
            name: user.displayName
          });
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
        } catch (error) {
          console.error('Error setting token', error);
        } finally {
          setLoader(false);
        }
      } else {
        localStorage.removeItem('token');
        setLoader(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const contextValue = {
    user,
    signUp,
    login,
    logout,
    updateUser,
    googleLogin,
    error,
    setError,
    loader,
    setLoader
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProviders;
