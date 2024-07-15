import React, { useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = () => {
    const axiosInstance = axios.create({
        baseURL: 'https://form-wiz.onrender.com/',
    });

    // interceptors
    useEffect(() => {
        // request interceptor
        const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
            // do something
            return config;
        }, function (error) {
            // do something with error
            return Promise.reject(error);
        });

        // response interceptor
        const responseInterceptor = axiosInstance.interceptors.response.use((response) => {
            return response;
        }, function (error) {
            return Promise.reject(error);
        });

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [axiosInstance]);

    return axiosInstance;
};

export default useAxiosFetch;
