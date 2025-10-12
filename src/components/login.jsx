import { useEffect } from 'react';
import logimage from '../assets/images/login-image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faLock } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { faUser } from '@fortawesome/free-regular-svg-icons/faUser';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faLockOpen } from '@fortawesome/free-solid-svg-icons/faLockOpen';



const Login = () => {

    useEffect(() => {
                document.title = 'Login - Sunrise Journal';
            }, [])
            
  return (
    <div className='flex gap-6 flex-col p-10 items-center'>
        <img src={logimage} className='h-60 w-auto' alt="" />
        <form action="" className='flex-col flex gap-5 w-full items-center'>
        <div className='px-4 overflow-hidden border-2 duration-200 outline-none  focus:border-orange-400 w-full  border-orange-700 rounded-full flex items-center justify-center gap-4'> <FontAwesomeIcon icon={faUserCircle} className='text-orange-700' /> <input type="text" className='placeholder-orange-700/35 w-full p-3 text-sm outline-none '  placeholder='Username' /></div>
        <div className='px-4 overflow-hidden border-2 duration-200 outline-none  focus:border-orange-400 w-full text-sm border-orange-700 rounded-full flex items-center justify-center gap-4'> <FontAwesomeIcon icon={faLock} className='text-orange-700' /> <input type="password" className='placeholder-orange-700/35 w-full p-3 text-sm outline-none '  placeholder='Password' /></div>
        <button className='bg-orange-700 hover:bg-orange-950  p-3 w-full font-bold text-[13px] text-white tracking-widest rounded-full duration-300'>LOGIN</button>
        <p className='text-sm'>Don't have an account? <a href="" className='text-orange-700'>Sign up</a></p>
        </form>
    </div>
  );
};

export default Login;