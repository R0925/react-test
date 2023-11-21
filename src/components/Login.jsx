import React from 'react'
import logo from '../logo.svg'
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://dummyjson.com/auth/login', data);
      console.log(response.data);
      localStorage.setItem('token',response.data.token)
      toast("ورود با موفقیت انجام شد.");
      setTimeout(() => {
        navigate('/products')
      }, 1000);

    } catch (error) {
      console.error(error);
      toast(" نام کاربری و یا رمز عبور اشتباه است.");

    }
  };

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <div className='lg:w-3/5 shadow-2xl m-auto lg:h-[400px] py-8 flex max-lg:flex-col-reverse    '>
      <div className='lg:w-1/2 flex h-full justify-center items-center border-r max-lg:border-none'>
        <form className='flex flex-col items-end' onSubmit={handleSubmit}>
          <div className='flex flex-col text-right'>
            <label htmlFor="username" className='text-sm text-gray-600'>نام کاربری</label>
            <input
              value={data.username}
              onChange={handleChange}
              type="text" name='username'
              className=' px-10 py-1 text-gray-700 my-2 border border-gray-300 rounded-md bg-gray-50' />
          </div>
          <div className='flex flex-col text-right mt-4'>
            <label htmlFor="password" className='text-sm text-gray-600'>رمز عبور</label>
            <input
              value={data.password}
              onChange={handleChange}
              type="password"
              name='password'
              className=' px-10 py-1 text-gray-700 my-2 border border-gray-300 rounded-md bg-gray-50' />
          </div>
          <button type='submit' className='bg-blue-400 text-white py-2 px-4 rounded-md text-sm mt-10'>ورود به حساب کاربری</button>
          <button  className='text-blue-400 text-sm mt-2'>رمز عبور را فراموش کردم</button>
        </form>
      </div>
      <div className="lg:w-1/2">
        <img src={logo} className='w-full h-full object-contain' alt="" />
      </div>
      <ToastContainer position='bottom-right' rtl='true' />

    </div>
  )
}

export default Login