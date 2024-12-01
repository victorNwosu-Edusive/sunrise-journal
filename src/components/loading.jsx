import React from 'react';
import load from '../assets/images/loading-screen.gif'
import logo from '../assets/images/sun-favicon.png'

const Loading = () => {
  return (
    <div className='flex h-lvh w-full justify-center items-center bg-orange-700'>
      <img src={load} className='w-full h-full z-50 '/>
      <div className='absolute flex justify-center z-50'>
      <div className='flex bg-orange-900 p-4'>
         <img src={logo} alt="" className='h-8 w-8'  />
         <p className='font-groteskbold text-sm text-white leading-3 pt-2'>Sunrise <br />Journal</p>
         </div>
      </div>
    </div>
  );
};

export default Loading;