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
        <div className=' p-9 bg-orange-100/35 pb-24'>
         <h1 className='font-bold text-orange-950 text-4xl mt-16 mb-5'>Welcome to <span className='text-orange-600/55'>Sunrise Journal</span>👋</h1>
         <h1 className='text-md text-slate-600'>Sunrise Journal is a sleek and intuitive journaling app designed to help you capture your thoughts, 
            ideas, and memories effortlessly. With its elegant design and user-friendly interface, Sunrise Journal 
            makes it easy to log daily reflections, set goals, and track your personal growth. Start your day with 
            clarity and end it with gratitude</h1>
        </div>
        <div className='bg-white rounded-xl p-7 m-6 md:m-16 lg:m-16 -mt-12 md:-mt-12 lg:-mt-12 shadow-sm flex flex-col items-center justify-center'>
            <img src={heroImage} alt="" className='mt-3 mb-5 h-40 w-auto flex items-center justify-center' />
        <h1 className='mb-1 font-bold text-md text-orange-950'>Start Journaling now</h1>
        <h1 className='mb-5 text-[11px] md:text-sm lg:text-sm text-slate-600'>Login to Journal to view saved journals</h1>
        <NavLink onClick={toggleModal} className="text-white text-sm bg-orange-600/55 hover:bg-orange-600/45 p-3 px-14 hover:shadow-orange-400/60 duration-300 rounded-md font-bold items-center justify-center"> Login</NavLink>
            
            {isModalOpen && <Loginmodal onClose={toggleModal} />}

        </div>
         </div>
        </>
    )
}

export default Journalscreen