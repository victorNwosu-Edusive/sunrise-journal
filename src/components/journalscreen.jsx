import React, { useState } from 'react';
import heroImage from '../assets/images/hero-image.png'
import Loginmodal from './loginmodal';
import { NavLink } from 'react-router-dom';


function Journalscreen(){

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to toggle modal visibility
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };


    return(
        <>
       
        <div className="h-screen md:h-screen lg:h-screen w-full md:w-full lg:w-4/5 ml-auto">
        <div className=' p-9 bg-white pb-24'>
        <h1 className='font-bold text-orange-950 text-[20px] mt-16 md:mt-9 lg:mt-9'>Welcome to</h1>
         <h1 className='font-bold text-orange-950 text-2xl md:text-4xl lg:text-4xl mb-5'>Sunrise Journal👋</h1>
         <h1 className='text-[14px] md:text-[15px] lg:text-[15px] text-slate-600'>Sunrise Journal is a sleek and intuitive journaling app designed to help you capture your thoughts, 
            ideas, and memories effortlessly. With its elegant design and user-friendly interface, Sunrise Journal 
            makes it easy to log daily reflections, set goals, and track your personal growth. Start your day with 
            clarity and end it with gratitude</h1>
        </div>
        <div className='bg-white rounded-xl p-7 m-6 md:m-16 lg:m-16 -mt-12 md:-mt-12 lg:-mt-12 shadow-sm flex flex-col items-center justify-center'>
            <img src={heroImage} alt="" className='mb-5 h-40 w-auto flex items-center justify-center' />
        <h1 className='mb-1 font-medium text-md text-orange-950 text-md'>Start Journaling now</h1>
        <h1 className='mb-5 text-[11px] md:text-sm lg:text-sm text-slate-600'>Login to Journal to view saved journals</h1>
        <NavLink onClick={toggleModal} className="text-white text-sm bg-orange-600/55 hover:bg-orange-600/45 p-3 px-14 hover:shadow-orange-400/60 duration-300 rounded-md font-bold items-center justify-center"> Login</NavLink>
            
            {isModalOpen && <Loginmodal onClose={toggleModal} />}

        </div>
         </div>
        </>
    )
}

export default Journalscreen