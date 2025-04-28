import React, { useState } from 'react';
import heroImage from '../assets/images/journal-image.png'
import Loginmodal from './loginmodal';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/sun-favicon.png';


function Journalscreen(){

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to toggle modal visibility
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };


    return(
        <>
        <div className='grid md:grid-cols-3 lg:grid-cols-3'>
        <div className='bg-hero-pattern bg-cover bg-center h-40 md:h-[100%] lg:h-[100%]'></div>
        <div className="md:col-span-2 lg:col-span-2 ml-auto">
        <div className=' p-9 bg-white pb-24'>
            <div className="flex">
        <img src={logo} alt="" className="h-11 w-11 md:h-9 md:w-9 lg:h-9 lg:w-9" />
            </div>
        <h1 className='font-bold text-orange-950 text-[18px] mt-9 md:mt-6 lg:mt-6 -mb-1'>Welcome to</h1>
         <h1 className='font-bold text-orange-950 text-2xl md:text-4xl lg:text-4xl mb-5'>Sunrise Journal</h1>
         <h1 className='text-[14px] md:text-[15px] lg:text-[15px] text-slate-600 bg-slate-200/30 rounded-xl p-6 pb-16'>Sunrise Journal is a sleek and intuitive journaling app designed to help you capture your thoughts, 
            ideas, and memories effortlessly. With its elegant design and user-friendly interface, Sunrise Journal 
            makes it easy to log daily reflections, set goals, and track your personal growth. Start your day with 
            clarity and end it with gratitude</h1>
        </div>
        <div className='rounded-xl p-7 m-6 md:m-16 lg:m-16 -mt-32 md:-mt-32 lg:-mt-40 shadow-sm flex z-10 flex-col items-center justify-center'>
            <img src={heroImage} alt="" className=' mb-5 h-40 w-auto flex items-center justify-center' />
        <div className='flex gap-3'>
        <NavLink onClick={toggleModal} className="text-white text-[12px] md:text-sm lg:text-sm bg-orange-600/55 hover:bg-orange-600/45 p-2 px-10 font-medium duration-300 rounded-md items-center justify-center"> Sign in</NavLink>
        <NavLink onClick={toggleModal} className="text-slate-600 text-[12px] md:text-sm lg:text-sm bg-slate-200 p-2 px-10 font-medium hover:bg-slate-300 duration-300 rounded-md items-center justify-center"> Sign up</NavLink>
        </div>    
            {isModalOpen && <Loginmodal onClose={toggleModal} />}

        </div>
         </div>
         </div>
        </>
    )
}

export default Journalscreen